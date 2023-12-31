import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  thunkCreateReview,
  thunkEditReview,
  thunkGetSingleReview,
} from "../../../store/review";
import Loading from "../../UtiltyComponents/Loading";
import { thunkGetBookDetails } from "../../../store/book";


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
  const [charactersLeft, setCharactersLeft] = useState(1000)
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(thunkGetSingleReview(reviewId));
  }, [dispatch, reviewId]);

  useEffect(() => {
    if (review && review.id === +reviewId) {
      setReviewBody(review.review_body);
      setReviewStars(review.review_stars);
      setActiveRating(review.review_stars)
    }
  }, [review, reviewId]);

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

  if ((type === "EDIT" && !review) || (type === "EDIT" && review.id !== +reviewId)) return <Loading />;

  const handleText = (e) => {
    const text = e.target.value;
    const characterCount = text.length;
    setCharactersLeft(1000 - characterCount)
    setReviewBody(text);
    
  }

  if (!bookId) bookId = review.book_id;

  const handleSubmit = async (e) => {
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
        await dispatch(thunkCreateReview(data, bookId));
      } else {
        await dispatch(thunkEditReview(data, review.id, bookId));
      }
      dispatch(thunkGetBookDetails(bookId))
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
        <label htmlFor="review-body">What did you think? {charactersLeft >= 0 && charactersLeft < 1000 && <span className="character-count">{charactersLeft}</span>}
                    {charactersLeft < 0 && <span className="character-count-errors">{charactersLeft}</span>}</label>
        {hasSubmitted && errors.review_body && (
          <p className="errors">{errors.review_body}</p>
        )}
        <textarea
          type="text"
          name="review-body"
          value={review_body}
          onChange={handleText}
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
