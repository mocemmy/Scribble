import { useDispatch, useSelector } from 'react-redux';
import './ReviewDisplay.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import OpenModalButton from '../OpenModalButton';
import ConfirmModal from '../ConfirmModal';
import { thunkDeleteReview, thunkGetReviewInfo } from '../../store/review';

function ReviewDisplay({ review }) {
  const user = useSelector(state => state.session.user)
  const owned = user.id === review.user_id; //check if user owns the review
  const dispatch = useDispatch();

    //format date as month dd, yyyy
  const time = new Date(review.created_at);
  const dispTime = time.toLocaleDateString('en-US', {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
  const stars = [1,2,3,4,5]
  const filledStar = "fa-solid fa-star"
  const emptyStar = "fa-regular fa-star"

  const handleDeleteReview = () => {
    if(review){
      dispatch(thunkDeleteReview(review.id, review.book_id))
      dispatch(thunkGetReviewInfo(review.book_id))
    }
  }

  return (
    <div className="review-container">
      <div className="user-info">
        <img src={review.user.profile_pic} alt="profile pic" />
        {review.user.first_name}
        <p>follow</p>
      </div>
      <div className="review-content">
        <div className="review-header">
          <p>{stars.map(num => (
            <i key={num} className={review.review_stars >= num ? filledStar : emptyStar}/>
          ))}</p>
          <p>{dispTime}</p>
        </div>
        <p>{review.review_body}</p>
        {owned && <Link to={`/app/reviews/${review.id}/edit`}>Edit review</Link>}
        {owned && <OpenModalButton
                    buttonText={"Delete review"}
                    modalComponent={
                      <ConfirmModal
                        modalTitle="Are you sure you want to delete your review?"
                        yesHandler={handleDeleteReview}
                      />}
                      />}
      </div>
    </div>
  );
}

export default ReviewDisplay;
