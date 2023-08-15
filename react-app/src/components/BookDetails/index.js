import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import { useEffect } from "react";
import { thunkGetBookDetails } from "../../store/book";
import "./BookDetails.css";
import ReviewSummary from "../ReviewSummary";
import ReviewInfoDisplay from "../ReviewInfoDisplay";

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
        <p onClick={(e) => window.alert("Feature coming soon")}>Want to read</p>
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
