import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import OpenModalButton from "../../OpenModalButton";
import ConfirmModal from "../../UtiltyComponents/ConfirmModal";
import { thunkDeleteReview } from "../../../store/review";
import { thunkGetBookDetails } from "../../../store/book";
import "./ReviewDisplay.css";

function ReviewDisplay({ review }) {
  const user = useSelector((state) => state.session.user);
  const owned = user.id === review.user_id; //check if user owns the review
  const dispatch = useDispatch();

  //format date as month dd, yyyy
  const time = new Date(review.created_at);
  const dispTime = time.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const stars = [1, 2, 3, 4, 5];
  const filledStar = "fa-solid fa-star";
  const emptyStar = "fa-regular fa-star";

  const handleDeleteReview = async () => {
    if (review) {
      await dispatch(thunkDeleteReview(review.id, review.book_id));
      dispatch(thunkGetBookDetails(review.book_id));
    }
  };

  return (
    <div className="review-container">
      <div className="user-info">
        <div className="profile-img-container">
          <img src={review.user.profile_pic} alt="profile pic" />
        </div>
        <p>{review.user.first_name}</p>
        <p>follow</p>
      </div>
      <div className="review-content">
        <div className="review-header">
          <p>
            {stars.map((num) => (
              <i
                key={num}
                className={review.review_stars >= num ? filledStar : emptyStar}
              />
            ))}
          </p>
          <p>{dispTime}</p>
        </div>
        <div className="review-text">
          <p>{review.review_body}</p>
        </div>
        <div className="options-container">
          {owned && (
            <Link to={`/app/reviews/${review.id}/edit`}>Edit review</Link>
          )}
          {owned && (
            <OpenModalButton
              className="button-as-link"
              buttonText={"Delete review"}
              modalComponent={
                <ConfirmModal
                  modalTitle="Are you sure you want to delete your review?"
                  yesHandler={handleDeleteReview}
                />
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ReviewDisplay;
