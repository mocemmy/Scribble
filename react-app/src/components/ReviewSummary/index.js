import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetReviewInfo, thunkGetReviews } from "../../store/review";
import Loading from "../Loading";
import ReviewDisplay from "../ReviewDisplay";
import { useHistory, Link } from 'react-router-dom'
import './ReviewSummary.css'

function ReviewSummary({ bookId }) {
  const reviewInfo = useSelector((state) => state.reviews.ReviewInformation);
  const reviews = useSelector((state) => state.reviews.AllReviews);
  const user = useSelector((state) => state.session.user)
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (bookId) {
      dispatch(thunkGetReviewInfo(bookId));
      dispatch(thunkGetReviews(bookId));
    }
  }, [dispatch, bookId]);

  if (!reviewInfo || !reviews) return <Loading />;
  const reviewArr = Object.values(reviews);
  let alreadyReviewed = false;
  if(reviewArr && user) {
    reviewArr.forEach(review => {
        if(review.user_id === user.id) alreadyReviewed = true;
    })
  }
  
  let reviewFlag;
  if (reviewInfo.review_count === 1) {
    reviewFlag = "review";
  } else {
    reviewFlag = "reviews";
  }
  const stars = [1,2,3,4,5]
  const filledStar = "fa-solid fa-star"
  const emptyStar = "fa-regular fa-star"
  const halfStar = "fa-solid fa-star-half-stroke"


  return (
    <div className="review-page-container">
      <div className="dummy-book-display"></div>
      <div>
        <h1>Ratings & Reviews</h1>
        <div>
          <h2>
            What do <span>you</span> think?
          </h2>
       {!alreadyReviewed && <Link to={`/app/books/${bookId}/review`}>Write a Review</Link>}
        </div>
        <div>
          <h3>Community Reviews</h3>
          <p>{stars.map(num => (
            <i className={reviewInfo.avg_rating >= num ? filledStar : num - reviewInfo.avg_rating < 1 ? halfStar : emptyStar} />
          ))} <span>{reviewInfo.avg_rating}</span></p>
          <p>
            {reviewInfo.review_count} {reviewFlag}
          </p>
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
