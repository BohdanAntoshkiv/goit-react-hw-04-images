import { Component } from "react";
import PropTypes from 'prop-types';
import { Modal } from "components/Modal/Modal";

export class ImageGalleryItem extends Component {
    state = {
        isModalOpened: false,
    };
    
    toggleModal = () => {
        this.setState(({ isModalOpened }) => ({ isModalOpened: !isModalOpened }));
    };


    render() {
        const { webformatURL, largeImageURL, tags } = this.props.image;
        return (
            <li className="ImageGalleryItem">
                <img 
                    className="ImageGalleryItem-image"
                    src={webformatURL} 
                    alt={tags}
                    onClick={this.toggleModal}
                />
                {this.state.isModalOpened && (
                    <Modal onClose={this.toggleModal}>
                        <img
                            src={largeImageURL}
                            alt={tags}
                        />
                    </Modal>
                )}
            </li>
        )
    }
}

ImageGalleryItem.propTypes = {
    image: PropTypes.object.isRequired,
};