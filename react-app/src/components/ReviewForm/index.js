import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  thunkCreateReview,
  thunkEditReview,
  thunkGetSingleReview,
} from "../../store/review";
import Loading from "../Loading";

function ReviewForm({ type }) {
  let { bookId, reviewId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const review = useSelector((state) => state.reviews.SingleReview);
  const [review_body, setReviewBody] = useState(
    review ? review.review_body : ""
  );
  const [review_stars, setReviewStars] = useState(
    review ? review.review_stars : 0
  );
  const [activeRating, setActiveRating] = useState(review_stars);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(thunkGetSingleReview(reviewId));
  }, [dispatch]);

  useEffect(() => {
    if (review) {
      setReviewBody(review.review_body);
      setReviewStars(review.review_stars);
    }
  }, [review]);

  useEffect(() => {
    const validationErrors = {};
    if (!review_body.length)
      validationErrors.review_body = "Review body is required";
    if (review_body.length > 1000)
      validationErrors.review_body =
        "Review body must be shorter than 1000 characters";

    if (review_stars === 0)
      validationErrors.review_stars = "Must rate at least 1 star";
    setErrors(validationErrors);
  }, [review_body, review_stars]);

  if (type === "EDIT" && !review) return <Loading />;

  if (!bookId) bookId = review.book_id;

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (!Object.keys(errors).length) {
      const data = {
        review_body,
        review_stars,
        book_id: bookId,
        user_id: user.id,
      };
      if (type === "CREATE") {
        dispatch(thunkCreateReview(data, bookId));
      } else {
        dispatch(thunkEditReview(data, review.id, bookId));
      }
      history.push(`/app/books/${bookId}/details`);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    history.push(`/app/books/${bookId}/details`);
  };

  let title, buttonText;
  if (type === "CREATE") {
    title = "Write a Review";
    buttonText = "Post review";
  } else {
    title = "Edit your Review";
    buttonText = "Save review";
  }

  const numStars = [1, 2, 3, 4, 5];
  const filledStar = "fa-solid fa-star";
  const emptyStar = "fa-regular fa-star";

  return (
    <div className="book-form-container">
      <form className="book-form">
        <h1 className="form-label">{title}</h1>
        <label htmlFor="stars">My rating:</label>
        {hasSubmitted && errors.review_stars && (
          <p className="errors">{errors.review_stars}</p>
        )}
        <div className="stars-container">
          {numStars.map((num) => (
            <i
              key={num}
              className={activeRating >= num ? filledStar : emptyStar}
              onMouseEnter={() => setActiveRating(num)}
              onMouseLeave={() => setActiveRating(review_stars || 0)}
              onClick={() => setReviewStars(num)}
            />
          ))}
        </div>
        <label htmlFor="review-body">What did you think?</label>
        {hasSubmitted && errors.review_body && (
          <p className="errors">{errors.review_body}</p>
        )}
        <textarea
          type="text"
          name="review-body"
          value={review_body}
          onChange={(e) => setReviewBody(e.target.value)}
        />
        <div className="button-container">
          <button
            className="submit-button cancel-button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button className="submit-button" onClick={handleSubmit}>
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReviewForm;
