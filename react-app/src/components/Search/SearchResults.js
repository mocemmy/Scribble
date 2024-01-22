import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "../UtiltyComponents/Loading";
import BookDisplay from "../BookComponents/BookDisplay";
import "./SearchResults.css";
import { useSearch } from "../../context/Search";
import { thunkSearchLists } from "../../store/search";
import ListDisplay from "../ListComponents/ListDisplay";
import { thunkSearchBooks } from "../../store/search";
import { thunkGetBookshelvesCurr } from "../../store/bookshelf";
import ReactPaginate from "react-paginate";

function SearchResults() {
  const storedSearch = localStorage.getItem("search");
  const books = useSelector((state) => state.books.SearchBooks);
  const [searchLists, setSearchLists] = useState(false);
  const [searchLoaded, setSearchLoaded] = useState(false);
  const [currPage, setCurrPage] = useState(0);
  const [totalPages, setTotalPages] = useState();
  const itemsPerPage = 5;
  const lists = useSelector((state) => state.lists.SearchLists);
  const dispatch = useDispatch();
  const { searchPhrase, setSearchPhrase } = useSearch();

  useEffect(() => {
    if (storedSearch) {
      setSearchPhrase(storedSearch);
    }
  }, [storedSearch]);

  useEffect(() => {
    let dataArr;
    if (searchLoaded && !searchLists) {
      const booksArr = Object.values(books).reverse();
      setTotalPages(Math.ceil(booksArr.length / itemsPerPage));
    } else if (searchLoaded && searchLists) {
      const listArr = Object.values(lists).reverse();
      setTotalPages(Math.ceil(listArr.length / itemsPerPage));
    }
  }, [searchLoaded]);

  useEffect(() => {
    const fetchData = async() => {

      if (storedSearch) {
        await dispatch(thunkSearchBooks(storedSearch));
        await dispatch(thunkSearchLists(storedSearch));
        if(books && lists) setSearchLoaded(true);
      }
      dispatch(thunkGetBookshelvesCurr());
    }
    fetchData();
    //cleanup local storage and search context
    return () => {
      localStorage.removeItem("search");
      setSearchPhrase(null);
    };
  }, [dispatch]);

  if (!searchLoaded) return <Loading />;
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
        <span className="search-phrase">"{storedSearch}"</span>:{" "}
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
      {!searchLists && booksArr.length > itemsPerPage && <div className="pagination-container">
        <ReactPaginate
          pageCount={totalPages}
          onPageChange={handlePageChange}
          forcePage={currPage}
        />
      </div>}
      {searchLists && listArr.length > itemsPerPage && <div className="pagination-container">
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
