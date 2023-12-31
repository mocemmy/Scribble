import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { thunkDeleteBook } from "../../../store/book";
import OpenModalButton from "../../OpenModalButton";
import ConfirmModal from "../../UtiltyComponents/ConfirmModal";
import "./BookDisplay.css";
import ReviewInfoDisplay from "../../ReviewComponents/ReviewInfoDisplay";
import AddToBookshelf from "../../BookshelfComponents/AddToBookshelf";
import { thunkGetListsCurrUser } from "../../../store/list";

function BookDisplay({ book, type }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleEditBook = () => {
    history.push(`/app/books/${book.id}/edit`);
  };

  const handleDeleteBook = async () => {
    await dispatch(thunkDeleteBook(book.id));
    dispatch(thunkGetListsCurrUser())
  };

  return (
    <div className="book-container">
      <Link to={`/app/books/${book.id}/details`}>
        <img id="book-display-image" src={book.book_cover} alt="book cover" />
      </Link>
      <div>
        <Link to={`/app/books/${book.id}/details`}>{book.title}</Link>
        <p className="author-name">
          {book.author_first_name}&nbsp;{book.author_last_name}
        </p>
        <ReviewInfoDisplay book={book} />
        <div className="options-container">
          {type === "OWNED" && (
            <button onClick={handleEditBook}>Edit book</button>
          )}
          {type === "OWNED" && (
            <OpenModalButton
              className="button-as-link"
              buttonText={"Delete book"}
              modalComponent={
                <ConfirmModal
                  modalTitle="Are you sure you want to delete your book?"
                  yesHandler={handleDeleteBook}
                />
              }
            />
          )}
        </div>
      </div>
      <div className="want-to-read-container">
        <AddToBookshelf bookId={book.id} />
      </div>
    </div>
  );
}

export default BookDisplay;
