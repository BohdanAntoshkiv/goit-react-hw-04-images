import { Component } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends Component {
    state = {
        search: '',
    };

    filterChanging = searchValue => {
        this.setState({ search: searchValue });
    };

    render() {
        return (
            <div className="App">
                <Searchbar onSubmit={this.filterChanging} />
                <ImageGallery queryName={this.state.search} />
                {/* <ImageGallery queryName={this.state.search} /> */}
            </div>
        );
    }
}
