import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export default function ImageGallery({ images }) {
    return (
        <>
            <ul className="ImageGallery">
                {images.map(image => (
                    <ImageGalleryItem key={image.id} image={image} />
                ))}
            </ul>
        </>
    );
}

ImageGallery.propTypes = {
    images: PropTypes.array.isRequired,
};
