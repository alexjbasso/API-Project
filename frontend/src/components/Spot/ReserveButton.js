import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookingFormButton from '../BookingFormButton';
import BookingFormModal from '../BookingFormModal';
import { getBookingsOfUserThunk } from '../../store/bookings';
import './ReserveButton.css'

function ReserveButton({ spot, reviews, user }) {
  const dispatch = useDispatch();
  const bookings = Object.values(useSelector(state => state.bookings?.userBookings))
  const userBooking = bookings.find(booking => booking.spotId === spot.id)

  useEffect(() => {
    if (user) {
      dispatch(getBookingsOfUserThunk())
    }
  }, [dispatch, bookings.length])

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
      {user && spot?.Owner.id !== user?.id && <BookingFormButton modalComponent={<BookingFormModal spot={spot} booking={userBooking} />} buttonText={userBooking ? "Edit Booking" : "Reserve"} />}</div>
  )
}



export default ReserveButton;
