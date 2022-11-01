import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
    const [search, setSearch] = useState('');

    const handleChange = e => {
        setSearch(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(search);
        reset();
    };
    const reset = () => {
        setSearch('');
    };

    return (
        <header className="Searchbar">
            <form onSubmit={handleSubmit} className="SearchForm">
                <button type="submit" className="SearchForm-button">
                    <span className="button-label"></span>
                </button>
                <input
                    name="search"
                    value={search}
                    onChange={handleChange}
                    className="SearchForm-input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    );
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
