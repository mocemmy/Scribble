import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { thunkSearchBooks } from '../../store/book';
import { useHistory } from 'react-router-dom';

function Search() {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSearch = async () => {
        if(search.length){
            await dispatch(thunkSearchBooks(search));
            history.push('/app/books/search')
        }
    }

    return (
        <>
        <div className="search-bar-container">
          <input type="text" placeholder="Search books" 
          value={search}
          onChange={e=>setSearch(e.target.value)}
          />
          <button type="submit"
            onClick={handleSearch}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        </>
    )
}

export default Search;