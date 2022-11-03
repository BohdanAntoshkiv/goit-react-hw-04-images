import { useEffect } from 'react';
// import { StyledOverlay, StyledModal } from './StyledModal';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#root');

export const Modal = ({ onClose, children }) => {
    useEffect(() => {
        function handleKeyDown(e) {
            console.log(e.code);
            if (e.code === 'Escape') {
                onClose();
            }
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

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
};

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
};
// ======================
// import { useEffect } from 'react';
// import { createPortal } from 'react-dom';
// import PropTypes from 'prop-types';

// const modalRoot = document.querySelector('#modal-root');

// export function Modal({ onClose, children }) {
//     const handleKeyDown = e => {
//         if (e.code === 'Escape') {
//             onClose();
//         }
//     };
//     useEffect(() => {
//         window.addEventListener('keydown', handleKeyDown);
//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//         };
//     }, []);

//     const handleOverlayClick = e => {
//         if (e.currentTarget === e.target) {
//             onClose();
//         }
//     };

//     return createPortal(
//         <div className="Overlay" onClick={handleOverlayClick}>
//             <div className="Modal">{children}</div>
//         </div>,
//         modalRoot
//     );
// }

// Modal.propTypes = {
//     onClose: PropTypes.func.isRequired,
// };
