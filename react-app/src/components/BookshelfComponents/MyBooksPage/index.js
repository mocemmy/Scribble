import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  thunkGetBooksOnShelf,
  thunkGetBookshelvesCurr,
} from "../../../store/bookshelf";
import Loading from "../../UtiltyComponents/Loading";
import { thunkGetAllBooksOnShelves } from "../../../store/bookshelf";
import BookshelfBookDisplay from "../BookshelfBookDisplay";
import "./MyBooksPage.css";

function MyBooksPage() {
  const bookshelves = useSelector((state) => state.bookshelves.AllBookshelves);
  const books = useSelector((state) => state.bookshelves.Books);
  const [currShelf, setCurrShelf] = useState("All");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetBookshelvesCurr());
    dispatch(thunkGetAllBooksOnShelves());
  }, [dispatch]);

  if (!bookshelves || !books) return <Loading />;
  const shelfArr = Object.values(bookshelves);
  const bookArr = Object.values(books);
  const handleGetAll = () => {
    dispatch(thunkGetAllBooksOnShelves());
    setCurrShelf("All");
  };
  const handleGetBooksOnShelf = (e, shelf) => {
    dispatch(thunkGetBooksOnShelf(shelf.id));
    setCurrShelf(shelf.shelf_type);
  };

  return (
    <>
      <h1>
        My Books: <span className="current-shelf-title">{currShelf}</span>
      </h1>
      <div className="bookshelf-container">
        <div className="bookshelves">
          <div className="shelf-container">
          <h4>Bookshelves</h4>
            <button
              onClick={handleGetAll}
              className={
                currShelf === "All"
                  ? "button-as-link current-shelf"
                  : "button-as-link"
              }
            >
              All
            </button>
            {shelfArr.map((shelf) => (
              <button
                onClick={(e) => handleGetBooksOnShelf(e, shelf)}
                key={shelf.id}
                className={
                  currShelf === shelf.shelf_type
                    ? "button-as-link current-shelf"
                    : "button-as-link"
                }
              >
                {shelf.shelf_type} {`(${shelf.books.length})`}
              </button>
            ))}
          </div>
        </div>
        <div className="book-list-container">
          <div className="list-header">
            <p>cover</p>
            <p>title</p>
            <p>author</p>
            <p>avg rating</p>
          </div>
          <div className="book-display">
            {bookArr.map((book) => (
              <BookshelfBookDisplay key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyBooksPage;
