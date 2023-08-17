import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "../UtiltyComponents/Loading";
import BookDisplay from "../BookComponents/BookDisplay";
import './SearchResults.css'


function SearchResults({ searchPhrase }) {
  const books = useSelector((state) => state.books.SearchBooks);
  const [searchLists, setSearchLists] = useState(false);
  const [searchLoaded, setSearchLoaded] = useState(false);
  useEffect(() => {
    setSearchLoaded(true);
  }, [books]);

  if (!searchLoaded || !books) return <Loading />;
  const booksArr = Object.values(books);

  return (
    <>
      <div className="search-tab-container">
        <button className={searchLists ? "tab" : "tab selected-tab"} onClick={(e) => setSearchLists(false)}>Books</button>
        <button className={searchLists ? "tab selected-tab" : "tab"} onClick={(e) => setSearchLists(true)}>Listopia</button>
      </div>
      <h3>Search results for {searchPhrase}: </h3>
      {!booksArr.length && <h4>No books found</h4>}
      {!!booksArr.length && !searchLists && booksArr.map((book) => (
        <BookDisplay key={book.id} book={book} />
      ))}
    </>
  );
}

export default SearchResults;
