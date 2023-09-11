import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useSearch } from '../../context/Search';
import { useDispatch } from 'react-redux';
import { thunkSearchBooks } from '../../store/book';
import { thunkSearchLists } from '../../store/list';

function Search() {
  const { searchPhrase, setSearchPhrase } = useSearch();
  const storedSearch = localStorage.getItem("search")
    const [search, setSearch] = useState( storedSearch ? storedSearch : "");
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
      if(!storedSearch && !searchPhrase) setSearch("")
    }, [storedSearch, searchPhrase])

    const handleSearch = async () => {
        if(search.length){
            setSearchPhrase(search)
            localStorage.setItem("search", search)
            dispatch(thunkSearchBooks(search))
            dispatch(thunkSearchLists(search))
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