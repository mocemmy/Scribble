import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetReviewInfo, thunkGetReviews } from "../../store/review";
import Loading from "../Loading";
import ReviewDisplay from "../ReviewDisplay";
import { useHistory, Link } from "react-router-dom";
import "./ReviewSummary.css";
import ReviewInfoDisplay from "../ReviewInfoDisplay";

function ReviewSummary({ bookId, setCount }) {
  const reviews = useSelector((state) => state.reviews.AllReviews);
  const book = useSelector((state) => state.books.SingleBook)
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (bookId) {
      dispatch(thunkGetReviews(bookId));
    }
  }, [dispatch, bookId]);

  if (!book || !reviews || +bookId !== book.id) return <Loading />;
  const reviewArr = Object.values(reviews);
  let alreadyReviewed = false;
  if (reviewArr && user) {
    reviewArr.forEach((review) => {
      if (review.user_id === user.id) alreadyReviewed = true;
    });
  }

  return (
    <div className="review-page-container">
      <div className="dummy-book-display"></div>
      <div className="review-display">
        <h1>Ratings & Reviews</h1>
        <div>
          <h2>
            What do <span>you</span> think?
          </h2>
          {!alreadyReviewed && (
            <Link to={`/app/books/${bookId}/review`}>Write a Review</Link>
          )}
        </div>
        <div>
          <h3>Community Reviews</h3>
          <ReviewInfoDisplay book={book}/>
        </div>
        <div>
          {reviewArr.map((review) => (
            <ReviewDisplay review={review} key={review.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReviewSummary;
