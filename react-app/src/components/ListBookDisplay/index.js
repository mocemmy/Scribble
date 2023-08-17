import { Link } from "react-router-dom";
import ReviewInfoDisplay from "../ReviewInfoDisplay";
import OpenModalButton from "../OpenModalButton";
import ConfirmModal from "../ConfirmModal";
import "./ListBookDisplay.css";
import { useDispatch } from "react-redux";
import { thunkRemoveBookFromList } from "../../store/list";
import AddToBookshelf from "../AddToBookshelf";

function ListBookDisplay({ book, num, type, listId }) {
  const dispatch = useDispatch();
  
  const handleRemoveBookFromList = () => {
    if(book.id && listId) dispatch(thunkRemoveBookFromList(book.id, listId))
  }

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
        {type !== "OWNED" &&
        <AddToBookshelf bookId={book.id} />}
        {type === "OWNED" && (
            <OpenModalButton
              className="button-as-link"
              buttonText={"Remove book from list"}
              modalComponent={
                <ConfirmModal
                  modalTitle="Are you sure you want to remove this book from your list?"
                  yesHandler={handleRemoveBookFromList}
                />
              }
            />
          )}
      </div>
    </div>
  );
}

export default ListBookDisplay;
