import { useState, useEffect, useRef } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getImages } from './Api/api';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';

export function App() {
    const [queryName, setQueryName] = useState('');
    const [images, setImages] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(null);

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
                if (response.length !== 0) {
                    const maxPage = response.length < 12 ? page : null;
                    setLastPage(maxPage);
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

    const filterChanging = newQuery => {
        if (newQuery === queryName || newQuery.trim() === '') {
            Notify.failure('Nothing to search');
            return;
        }
        setQueryName(newQuery);
        setImages([]);
        setPage(1);
    };

    const showButton = () => {
        if (images.length === 0) {
            return;
        }
        if (isLoading === true) {
            return;
        }
        if (lastPage) {
            return;
        }
        return <Button onLoad={onLoadMore}>LOAD MORE...</Button>;
    };

    return (
        <div className="App">
            <Searchbar onSubmit={filterChanging} />
            {images.length > 0 && <ImageGallery images={images} />}
            {showButton()}
            {isLoading && <Loader />}
        </div>
    );
}
