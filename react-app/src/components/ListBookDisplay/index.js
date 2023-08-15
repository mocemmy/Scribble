import { Link } from "react-router-dom";
import ReviewInfoDisplay from "../ReviewInfoDisplay";
import "./ListBookDisplay.css";

function ListBookDisplay({ book, num }) {
  return (
    <div className="book-container list-book-container">
      <p className="list-number">{num + 1}</p>
      <Link to={`/app/books/${book.id}/details`}>
        <img id="book-display-image" src={book.book_cover} alt="book cover" />
      </Link>
      <div>
        <Link className="list-title" to={`/app/books/${book.id}/details`}>{book.title}</Link>
        <p className="author-name">
          by&nbsp;
          {book.author_first_name}&nbsp;{book.author_last_name}
        </p>
        <ReviewInfoDisplay book={book} />
      </div>
      <div className="want-to-read-container">
        <button
          className="want-to-read"
          onClick={(e) => window.alert("Feature coming soon!")}
        >
          Want to Read
        </button>
      </div>
    </div>
  );
}

export default ListBookDisplay;
