import './ReviewDisplay.css';

function ReviewDisplay({ review }) {
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
      </div>
    </div>
  );
}

export default ReviewDisplay;
