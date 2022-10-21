import PropTypes from 'prop-types';

export const Button = ({onLoad, children}) => {
    return (
        <button
        className="Button"
            onClick={onLoad}
            type="button"
        >
            {children}
        </button>
    )
} 


Button.propTypes = {
    onLoad: PropTypes.func.isRequired,
};