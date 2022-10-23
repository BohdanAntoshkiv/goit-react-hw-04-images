import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getImages } from 'components/Api/api';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

export default class ImageGallery extends Component {
    state = {
        images: [],
        isLoading: false,
        page: 1,
        lastPage: null,
    };

    componentDidUpdate = async (prevProps, prevState) => {
        const { queryName } = this.props;
        const { page } = this.state;
        const pageInFetch = prevProps.queryName !== queryName ? 1 : page;
        if (prevProps.queryName !== queryName || prevState.page !== page) {
            if (queryName === '') {
                Notify.failure('Nothing to search');
                return;
            }

            try {
                this.setState({ isLoading: true });
                const response = await getImages(queryName, pageInFetch);

                if (response.length !== 0) {
                    const maxPage =
                        response.length < 12 ? this.state.page : null;
                    this.setState({ lastPage: maxPage });
                }
                if (response.length === 0) {
                    Notify.failure('Nothing founded');
                    this.setState({ isLoading: false });
                    return;
                }
                if (prevProps.queryName !== queryName) {
                    this.setState({ images: response, page: 1 });
                }
                if (prevState.page !== page && page !== 1) {
                    this.setState(state => ({
                        images: [...state.images, ...response],
                    }));
                }
                this.setState({ isLoading: false });
            } catch (error) {
                Notify.failure(error.message);
            }
        }
    };

    onLoadMore = () => {
        this.setState(state => ({ page: state.page + 1 }));
    };

    showButton = () => {
        const { images, isLoading, lastPage } = this.state;
        if (images.length === 0) {
            return;
        }
        if (isLoading === true) {
            return;
        }
        if (lastPage) {
            return;
        }
        return <Button onLoad={this.onLoadMore}>LOAD MORE...</Button>;
    };

    render() {
        const { images, isLoading } = this.state;
        return (
            <>
                <ul className="ImageGallery">
                    {images.map(image => (
                        <ImageGalleryItem key={image.id} image={image} />
                    ))}
                </ul>
                {this.showButton()}
                {isLoading && <Loader />}
            </>
        );
    }
}
