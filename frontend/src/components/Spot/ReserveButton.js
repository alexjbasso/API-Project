import BookingFormButton from '../BookingFormButton';
import BookingFormModal from '../BookingFormModal';
import './ReserveButton.css'

function ReserveButton({ spot, reviews, user }) {

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
      {user && <BookingFormButton modalComponent={BookingFormModal({ spot })} buttonText={"Reserve"}></BookingFormButton>}
    </div>
  )
}



export default ReserveButton;
