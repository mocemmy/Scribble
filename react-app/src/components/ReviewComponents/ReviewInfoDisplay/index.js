function ReviewInfoDisplay({ book }) {
  const stars = [1, 2, 3, 4, 5];
  const filledStar = "fa-solid fa-star";
  const emptyStar = "fa-regular fa-star";
  const halfStar = "fa-solid fa-star-half-stroke";

  const avgRating = (+book.avg_rating).toFixed(2)
  return (
    <div>
      {book.review_count === 0 && (
        <div className="review-info">
          <p>
            {stars.map((num) => (
              <i key={num} className="fa-regular fa-star" />
            ))}
          </p>
          <p>{book.avg_rating}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
        </div>
      )}
      {book.review_count !== 0 && (
        <div className="review-info">
          <p>
            {stars.map((num) => (
              <i
                key={num}
                className={
                  book.avg_rating >= num
                    ? filledStar
                    : num - book.avg_rating < 1
                    ? halfStar
                    : emptyStar
                }
              />
            ))}
          </p>
          <p>
            {avgRating} avg rating -{" "}
            {book.review_count !== 1 ? (
              <span>{book.review_count} reviews</span>
            ) : (
              <span>{book.review_count} review&nbsp;</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}

export default ReviewInfoDisplay;
