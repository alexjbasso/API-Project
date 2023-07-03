import { dateFormatter } from "../../utils/utils";

function Reviews({ reviews, spot, user }) {

  if (reviews.length > 0) {
    const sortedReviews = reviews.toReversed();
    return (
      <div className="review-container">
        <div className="review-rating">
          <i className="fa-solid fa-star" />
          <span>{spot.avgStarRating.toFixed(2)} • {spot.numReviews} {reviews.length === 1 ? "Review" : "Reviews"}</span>
        </div>
        {
          sortedReviews.map((review) => (
            <div className="review-container" key={review.id}>
              <h3>{review.User.firstName}</h3>
              <h4>{dateFormatter(review.createdAt)}</h4>
              <p>{review.review}</p>
            </div>
          ))
        }
      </div>
    )
  }

  if (reviews.length === 0) {
    return (
      <div className="review-container">
        <div className="review-rating">
          <i className="fa-solid fa-star" />
          <span>New</span>
        </div>
        {spot.ownerId !== user.id ? <h1>Be the first to post a review!</h1>: null}
      </div>
    )
  }

}

export default Reviews;