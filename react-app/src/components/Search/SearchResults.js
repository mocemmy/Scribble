import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useContext } from "react";
import Loading from "../UtiltyComponents/Loading";
import BookDisplay from "../BookComponents/BookDisplay";
import './SearchResults.css'
import { useSearch } from "../../context/Search";
import { thunkSearchLists } from "../../store/list";
import ListDisplay from "../ListComponents/ListDisplay";
import { thunkSearchBooks } from "../../store/book";


function SearchResults() {
    const storedSearch = localStorage.getItem("search")
  const books = useSelector((state) => state.books.SearchBooks);
  const [searchLists, setSearchLists] = useState(false);
  const [searchLoaded, setSearchLoaded] = useState(false);
  const lists = useSelector(state => state.lists.SearchLists);
  const dispatch = useDispatch();
  const { searchPhrase, setSearchPhrase } = useSearch()

  useEffect(() => {
    if(storedSearch){
        dispatch(thunkSearchBooks(storedSearch))
        dispatch(thunkSearchLists(storedSearch))
    } else if(searchPhrase){
        dispatch(thunkSearchBooks(searchPhrase))
        dispatch(thunkSearchLists(searchPhrase))
    }

    return () => {
        localStorage.removeItem("search")
        setSearchPhrase(null)
    }
  }, [searchPhrase, storedSearch])

  useEffect(() => {
    if(books && lists) setSearchLoaded(true);
  }, [books, lists]);

  if (!searchLoaded) return <Loading />;
  const booksArr = Object.values(books);
  const listArr = Object.values(lists)

  return (
    <>
      <div className="search-tab-container">
        <button className={searchLists ? "tab" : "tab selected-tab"} onClick={(e) => setSearchLists(false)}>Books</button>
        <button className={searchLists ? "tab selected-tab" : "tab"} onClick={(e) => setSearchLists(true)}>Listopia</button>
      </div>
      <h3>Search results for <span className="search-phrase">"{storedSearch}"</span>: </h3>
      {!booksArr.length && !searchLists && <h4>No books found</h4>}
      {!!booksArr.length && !searchLists && booksArr.map((book) => (
        <BookDisplay key={book.id} book={book} />
      ))}
      {!listArr.length && searchLists && <h4>No lists found</h4>}
      {!!listArr.length && searchLists && listArr.map((list) => (
        <ListDisplay key={list.id} list={list} />
      ))}
    </>
  );
}

export default SearchResults;
