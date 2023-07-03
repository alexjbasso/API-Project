function ReserveButton({spot, reviews}) {

  const handleClick = (e) => {
    e.preventDefault();

    window.alert("Feature coming soon!")
  }

  return (
    <div className="reserve-container">
      <div className="review-sum">
        <span>
        ${spot.price} night
        </span>
        <div className="review-rating">
          <i className="fa-solid fa-star" />
          <span>{reviews.length === 0 ? "New" : `${spot.avgStarRating.toFixed(2)} • ${spot.numReviews} ${reviews.length === 1 ? "Review" : "Reviews"}`}</span>
        </div>
      </div>
      <button onClick={handleClick}>Reserve</button>
    </div>
  )
}

export default ReserveButton;
