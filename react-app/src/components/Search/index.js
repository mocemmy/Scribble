import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useSearch } from '../../context/Search';

function Search() {
  const { searchPhrase, setSearchPhrase } = useSearch();
  const storedSearch = localStorage.getItem("search")
    const [search, setSearch] = useState( storedSearch ? storedSearch : "");
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
      if(!storedSearch) setSearch("")
    }, [storedSearch, searchPhrase])

    const handleSearch = async () => {
        if(search.length){
            setSearchPhrase(search)
            localStorage.setItem("search", search)
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