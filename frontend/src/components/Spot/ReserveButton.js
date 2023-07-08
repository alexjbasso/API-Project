import './ReserveButton.css'

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
          <span className='rate'>
            <span className='spot-price'>
              ${spot.price}
            </span>
            <span className='night-span'>night</span>
          </span>
          <div className="review-rating">
            <i className="fa-solid fa-star" />
            <span>{spot.numReviews === 0 ? "New" : `${spot?.avgStarRating.toFixed(2)} • ${spot.numReviews} ${spot.numReviews === 1 ? "review" : "reviews"}`}</span>
          </div>
        </div>

        <button className="reserve-button" onClick={handleClick}>Reserve</button>
      </div>
    )
  } else {
    return null
  }




}





export default ReserveButton;
