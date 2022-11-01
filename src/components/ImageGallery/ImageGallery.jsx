import { useState, useEffect, useRef } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getImages } from 'components/Api/api';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

export default function ImageGallery({ queryName }) {
    // const [queryName, setQueryName] = useState('');
    const [images, setImages] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (queryName === '') {
            return;
        }

        async function foo() {
            try {
                setLoading(true);
                const response = await getImages(queryName, page);
                if (response.length === 0) {
                    Notify.failure('Nothing founded');
                    setLoading(false);
                    return;
                }
                setImages(prev => [...prev, ...response]);
                setLoading(false);
            } catch (error) {
                Notify.failure(error.message);
            }
        }

        foo();
    }, [queryName, page]);

    const onLoadMore = () => {
        setPage(page => page + 1);
    };

    // setQueryName(() => {
    //     if (queryName.trim() === '') {
    //         Notify.failure('Nothing to search');
    //         return;
    //     }
    //     setQueryName(queryName);
    //     setImages([]);
    //     setPage(1);
    // });

    //   const filterChanging = (newQuery) => {
    //     if (newQuery === queryName || newQuery.trim() === '') {
    //       Notify.failure('Nothing to search');
    //       return;
    //     }
    //     setQueryName(newQuery);
    //     setImages([]);
    //     setPage(1);
    //   }

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // state = {
    //     images: [],
    //     isLoading: false,
    //     page: 1,
    //     lastPage: null,
    // };

    // componentDidUpdate = async (prevProps, prevState) => {
    //     const { queryName } = this.props;
    //     const { page } = this.state;
    //     const pageInFetch = prevProps.queryName !== queryName ? 1 : page;
    //     if (prevProps.queryName !== queryName || prevState.page !== page) {
    //         if (queryName === '') {
    //             Notify.failure('Nothing to search');
    //             return;
    //         }

    //         try {
    //             this.setState({ isLoading: true });
    //             const response = await getImages(queryName, pageInFetch);

    //             if (response.length !== 0) {
    //                 const maxPage =
    //                     response.length < 12 ? this.state.page : null;
    //                 this.setState({ lastPage: maxPage });
    //             }
    //             if (response.length === 0) {
    //                 Notify.failure('Nothing founded');
    //                 this.setState({ isLoading: false });
    //                 return;
    //             }
    //             if (prevProps.queryName !== queryName) {
    //                 this.setState({ images: response, page: 1 });
    //             }
    //             if (prevState.page !== page && page !== 1) {
    //                 this.setState(state => ({
    //                     images: [...state.images, ...response],
    //                 }));
    //             }
    //             this.setState({ isLoading: false });
    //         } catch (error) {
    //             Notify.failure(error.message);
    //         }
    //     }
    // };

    // onLoadMore = () => {
    //     this.setState(state => ({ page: state.page + 1 }));
    // };

    const showButton = () => {
        // const { images, isLoading, lastPage } = this.state;
        if (images.length === 0) {
            return;
        }
        if (isLoading === true) {
            return;
        }
        // if (lastPage) {
        //     return;
        // }
        return <Button onLoad={onLoadMore}>LOAD MORE...</Button>;
    };

    return (
        <>
            <ul className="ImageGallery">
                {images.map(image => (
                    <ImageGalleryItem key={image.id} image={image} />
                ))}
            </ul>
            {showButton()}
            {isLoading && <Loader />}
        </>
    );
}
