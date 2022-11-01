import { useState, useRef, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export function App() {
    // state = {
    //     search: '',
    // };

    const isFirstRender = useRef(true);

    if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
    }

    const [filterParams, setFilterParams] = useState('');
    const filterChanging = searchValue => {
        //   const filterChanging = (newQuery) => {
        //     if (newQuery === queryName || newQuery.trim() === '') {
        //       Notify.failure('Nothing to search');
        //       return;
        //     }
        //     setQueryName(newQuery);
        //     setImages([]);
        //     setPage(1);
        //   }
        if (filterParams === searchValue || filterParams.trim() === '') {
            Notify.failure('Nothing to search');
            return;
        }
        setFilterParams(searchValue);
    };

    return (
        <div className="App">
            <Searchbar onSubmit={searchValue => filterChanging(searchValue)} />
            <ImageGallery queryName={filterParams} />
            {/* <ImageGallery queryName={this.state.search} /> */}
        </div>
    );
}
