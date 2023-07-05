function ReserveButton({ spot, reviews }) {

  const handleClick = (e) => {
    e.preventDefault();

    window.alert("Feature coming soon!")
  }

  const keys = Object.keys(spot)

  if (keys.includes("numReviews")) {
    return (
      <div className="reserve-container">
        <div className="review-sum">
          <span>
            ${spot.price} night
          </span>
          <div className="review-rating">
            <i className="fa-solid fa-star" />
            <span>{spot.numReviews === 0 ? "New" : `${spot.avgStarRating.toFixed(2)} • ${spot.numReviews} ${spot.numReviews === 1 ? "Review" : "Reviews"}`}</span>
          </div>
        </div>
        <button onClick={handleClick}>Reserve</button>
      </div>
    )
  } else {
    return null
  }




}





export default ReserveButton;
