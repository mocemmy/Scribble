import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { thunkGetReviews } from "../../../store/review";
import Loading from "../../UtiltyComponents/Loading";
import ReviewDisplay from "../../ReviewComponents/ReviewDisplay";
import ReviewInfoDisplay from "../../ReviewComponents/ReviewInfoDisplay";
import "./ReviewSummary.css";

function ReviewSummary({ bookId }) {
  const reviews = useSelector((state) => state.reviews.AllReviews);
  const book = useSelector((state) => state.books.SingleBook)
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

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
        <div className="review-display-container">
          {reviewArr.map((review) => (
            <ReviewDisplay review={review} key={review.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReviewSummary;
