import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "../UtiltyComponents/Loading";
import BookDisplay from "../BookComponents/BookDisplay";
import "./SearchResults.css";
import { useSearch } from "../../context/Search";
import ListDisplay from "../ListComponents/ListDisplay";
import ReactPaginate from "react-paginate";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

function SearchResults() {
  const { searchLoaded, setSearching, setQuery, query } = useSearch();
  const books = useSelector((state) => state.search.searchedBooks)
  const lists = useSelector((state) => state.search.searchedLists)
  const [searchLists, setSearchLists] = useState(false);
  const [currPage, setCurrPage] = useState(0);
  const [totalPages, setTotalPages] = useState();
  const itemsPerPage = 5;
  const location = useLocation();
  const searchParams = new URLSearchParams(location?.search);


  const clearSearch = () => {
    setSearching(false)
    setQuery('')
  }

  useEffect(() => {
    //on component mount extract search params from url and set query
    const param = searchParams.get('query')
    setQuery(param)
    return clearSearch
  }, [])


  useEffect(() => {
    if (searchLoaded && !searchLists) {
      const booksArr = Object.values(books);
      setTotalPages(Math.ceil(booksArr.length / itemsPerPage));
    } else if (searchLoaded && searchLists) {
      const listArr = Object.values(lists);
      setTotalPages(Math.ceil(listArr.length / itemsPerPage));
    }
  }, [searchLoaded]);

  if(!books || !lists) return <Loading/>

  const booksArr = Object.values(books).reverse();
  const listArr = Object.values(lists).reverse();

  const handleSwitchTabs = (e, val) => {
    setSearchLists(val);
    setCurrPage(0);
  };
  const startIndex = currPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subsetBooks = booksArr.slice(startIndex, endIndex);
  const subsetLists = listArr.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage) => {
    setCurrPage(selectedPage.selected);
  };
  

  return (
    <>
      <div className="search-tab-container">
        <button
          className={searchLists ? "tab" : "tab selected-tab"}
          onClick={(e) => handleSwitchTabs(e, false)}
        >
          Books
        </button>
        <button
          className={searchLists ? "tab selected-tab" : "tab"}
          onClick={(e) => handleSwitchTabs(e, true)}
        >
          Listopia
        </button>
      </div>
      <h3>
        Search results for{" "}
        <span className="search-phrase">"{query}"</span>:{" "}
      </h3>
      <p className="author-name">
        Showing {startIndex + 1} - {endIndex} of{" "}
        {searchLists ? listArr.length : booksArr.length} results
      </p>
      {!subsetBooks.length && !searchLists && <h4>No books found</h4>}
      {!!subsetBooks.length &&
        !searchLists &&
        subsetBooks.map((book) => <BookDisplay key={book.id} book={book} />)}
      {!subsetLists.length && searchLists && <h4>No lists found</h4>}
      {!!subsetLists.length &&
        searchLists &&
        subsetLists.map((list) => <ListDisplay key={list.id} list={list} />)}
      {!searchLists && <div className="pagination-container">
        <ReactPaginate
          pageCount={totalPages}
          onPageChange={handlePageChange}
          forcePage={currPage}
        />
      </div>}
      {searchLists && <div className="pagination-container">
        <ReactPaginate
          pageCount={totalPages}
          onPageChange={handlePageChange}
          forcePage={currPage}
        />
      </div>}
    </>
  );
}

export default SearchResults;
