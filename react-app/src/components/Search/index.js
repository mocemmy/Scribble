import React, { useState, useContext } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkSearchBooks } from '../../store/book';
import { useSearch } from '../../context/Search';

function Search() {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const { setSearchPhrase } = useSearch();

    const handleSearch = async () => {
        if(search.length){
            setSearchPhrase(search)
            await dispatch(thunkSearchBooks(search));
            history.push('/app/books/search')
        }
    }

    const handleEnter = (e) =>  {
      if(e.key === 'Enter' || e.key === 'NumpadEnter') handleSearch();

    }

    return (
        <>
        <div className="search-bar-container">
          <input type="text" placeholder="Search books" 
          value={search}
          onKeyDown={handleEnter}
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