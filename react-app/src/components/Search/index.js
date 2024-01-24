import React from 'react'
import { useSearch } from '../../context/Search';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Search() {
  const { search, query, setQuery } = useSearch();
    const history = useHistory();

    const handleSearch = () =>{
        //use search params to keep the search context on page refresh
        const url = '/app/search'
        const searchParams = new URLSearchParams({query})
        history.push(`${url}?${searchParams.toString()}`)
        search(query)
    }

    const handleEnter = (e) =>  {
      if(e.key === 'Enter' || e.key === 'NumpadEnter') handleSearch();
    }

    return (
        <>
        <div className="search-bar-container">
          <input type="text" placeholder="Search books" 
          value={query}
          onKeyDown={handleEnter}
          onChange={e=>setQuery(e.target.value)}
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