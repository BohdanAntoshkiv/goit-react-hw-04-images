import {Component} from "react";
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
    state = {
        search: "",
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.search);
        this.reset();
    }

    reset = () => {
        this.setState({ search: ''});
    };

    render() {
        const {search} = this.state;
        return (
            <header className="Searchbar">
                <form 
                onSubmit={this.handleSubmit}
                className="SearchForm">
                    <button 
                        type="submit" 
                        className="SearchForm-button"
                    >
                    <span className="button-label"></span>
                    </button>
                    <input
                        name="search"
                        value={search}
                        onChange={this.handleChange}
                        className="SearchForm-input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        )
    }
}

Searchbar.propTypes = { 
    onSubmit: PropTypes.func.isRequired 
};