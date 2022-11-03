import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#root');

export function Modal({ onClose, children }) {
    const handleKeyDown = e => {
        if (e.code === 'Escape') {
            onClose();
        }
    };
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    const handleOverlayClick = e => {
        if (e.currentTarget === e.target) {
            onClose();
        }
    };

    return createPortal(
        <div className="Overlay" onClick={handleOverlayClick}>
            <div className="Modal">{children}</div>
        </div>,
        modalRoot
    );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
};
