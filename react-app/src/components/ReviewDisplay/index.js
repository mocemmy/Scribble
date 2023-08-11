import './ReviewDisplay.css';

function ReviewDisplay({ review }) {
    //format date as month dd, yyyy
  const time = new Date(review.created_at);
  const dispTime = time.toLocaleDateString('en-US', {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  return (
    <div className="review-container">
      <div className="user-info">
        <img src={review.user.profile_pic} alt="profile pic" />
        {review.user.first_name}
        <p>follow</p>
      </div>
      <div className="review-content">
        <div className="review-header">
          <p>{review.review_stars}</p>
          <p>{dispTime}</p>
        </div>
        <p>{review.review_body}</p>
      </div>
    </div>
  );
}

export default ReviewDisplay;
