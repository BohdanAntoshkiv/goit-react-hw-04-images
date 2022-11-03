import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';

export function ImageGalleryItem({ image }) {
    const { webformatURL, largeImageURL, tags } = image;
    const [isModalOpened, setModalOpened] = useState(false);

    const toggleModal = () => {
        setModalOpened(!isModalOpened);
    };

    return (
        <li className="ImageGalleryItem">
            <img
                className="ImageGalleryItem-image"
                src={webformatURL}
                alt={tags}
                onClick={toggleModal}
            />
            {isModalOpened && (
                <Modal onClose={toggleModal}>
                    <img src={largeImageURL} alt={tags} />
                </Modal>
            )}
        </li>
    );
}

ImageGalleryItem.propTypes = {
    image: PropTypes.object.isRequired,
};
