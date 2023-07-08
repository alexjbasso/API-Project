import { dateFormatter } from "../../utils/utils";
import CreateReviewModal from "../CreateReviewModal";
import DeleteReviewModal from "../DeleteReviewModal";
import OpenModalButton from "../OpenModalButton"
import './Reviews.css'

function Reviews({ reviews, spot, user }) {

  const reviewUsers = [];
  reviews.forEach(review => reviewUsers.push(review.userId))

  const keys = Object.keys(spot)

  if (keys.includes("numReviews")) {
    if (reviews.length > 0) {
      const sortedReviews = reviews.toReversed();
      return (
        <div className="reviews-container">
          <div className="review-rating">
            <i className="fa-solid fa-star" />
            <span>{spot.avgStarRating?.toFixed(2)} • {spot.numReviews} {reviews.length === 1 ? "review" : "reviews"}</span>
          </div>
          <div className="post-review-container">
            {user && !reviewUsers.includes(user.id) && spot.ownerId !== user.id ? <OpenModalButton
              buttonText="Post Your Review"
              modalComponent={<CreateReviewModal className="create-review-modal" spot={spot} />}
            /> : null}
          </div>
          {
            sortedReviews.map((review) => (
              <div className="review-container" key={review.id}>
                <h4>{review.User ? review.User.firstName : null}</h4>
                <h5>{dateFormatter(review.createdAt)}</h5>
                <p>{review.review}</p>
                {user && review.userId === user.id ? <OpenModalButton
                  buttonText="Delete"
                  modalComponent={<DeleteReviewModal review={review} />}
                /> : null}
              </div>
            ))
          }
        </div>
      )
    }

    if (reviews.length === 0) {
      return (
        <div className="reviews-container">

          <div className="review-rating">
            <i className="fa-solid fa-star" />
            <span>New</span>
          </div>

          <div className="post-review-container">

            {user && !reviewUsers.includes(user.id) && spot.ownerId !== user.id ? <OpenModalButton
              buttonText="Post Your Review"
              modalComponent={<CreateReviewModal className="create-review-modal" spot={spot} />}
            /> : null}
          </div>

          {user && spot.ownerId !== user.id ? <h1>Be the first to post a review!</h1> : null}

        </div>
      )
    }
  } else {
    return null;
  }

}

export default Reviews;
