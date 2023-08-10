import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { thunkDeleteBook } from "../../store/book";

function BookDisplay({ book, type }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleEditBook = () => {
    history.push(`/app/books/${book.id}/edit`)
  }

  const handleDeleteBook = () => {
    dispatch(thunkDeleteBook(book.id))
  }

  return (
    <div className="book-container">
    <Link to={`/app/books/${book.id}/details`} >
      <img src={book.book_cover} alt="book cover" />
      </Link>
      <div>
        <Link to={`/app/books/${book.id}/details`}>{book.title}</Link>
        <p>
          {book.author_first_name}&nbsp;{book.author_last_name}
        </p>
        {type === "OWNED" && <button onClick={handleEditBook}>Edit book</button>}
        {type === "OWNED" && <button onClick={handleDeleteBook}>Delete book</button>}
      </div>
    
    </div>
  );
}

export default BookDisplay;
