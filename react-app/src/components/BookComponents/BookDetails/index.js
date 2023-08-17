import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Loading from '../../UtiltyComponents/Loading';
import { thunkGetBookDetails } from "../../../store/book";
import "./BookDetails.css";
import ReviewSummary from "../../ReviewComponents/ReviewSummary";
import ReviewInfoDisplay from "../../ReviewComponents/ReviewInfoDisplay";
import OpenModalButton from "../../OpenModalButton";
import AddBookToListModal from "../../ListComponents/AddBookToListModal";
import AddToBookshelf from "../../BookshelfComponents/AddToBookshelf";

function BookDetails() {
  const { bookId } = useParams();
  const book = useSelector((state) => state.books.SingleBook);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetBookDetails(bookId));
  }, [dispatch, bookId]);

  if (!book || +bookId !== book.id) return <Loading />;
  return (
    <div className="book-details-page-container">
      <div className="book-image-container">
        <img id="book-cover" src={book.book_cover} alt="book cover" />
        <div className="add-buttons-container">
          <AddToBookshelf bookId={bookId} type="book-details" />
          <div className="want-to-read-div">
            <OpenModalButton
              className="add-to-list-button"
              buttonText="Add book to a list"
              modalComponent={<AddBookToListModal bookId={bookId} />}
            />
          </div>
        </div>
      </div>
      <div className="right-side-container">
        <div className="book-info-container">
          <div className="book-details-page">
            <div className="book-info-container">
              <div>
                <h1>{book.title}</h1>
                <h3>
                  {book.author_first_name}&nbsp;{book.author_last_name}
                </h3>
                <ReviewInfoDisplay book={book} />
                <p>{book.summary}</p>
              </div>
            </div>
          </div>
        </div>

        <ReviewSummary bookId={book.id} />
      </div>
    </div>
  );
}

export default BookDetails;
