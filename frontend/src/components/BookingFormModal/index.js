import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal';
import { createBookingThunk, deleteBookingThunk, editBookingThunk } from "../../store/bookings";
import "./BookingFormModal.css"

export default function BookingFormModal({ spot, booking }) {
  const dispatch = useDispatch();
  const [start, setStart] = useState(booking?.startDate);
  const [end, setEnd] = useState(booking?.endDate);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    let resBook;

    const formData = { startDate: start, endDate: end }

    if (booking) {
      resBook = await dispatch(editBookingThunk(booking.id, formData))
    }
    else if (!booking) {
      resBook = await dispatch(createBookingThunk(spot.id, formData))
      console.log("resBook", resBook)
    }

    if (resBook.errors) {
      setErrors(resBook.errors)
    }
    else {
      closeModal();
    }
  }

  const handleBookingDelete = async (e) => {
    e.preventDefault();
    closeModal();
    await dispatch(deleteBookingThunk(booking.id))
    closeModal();
  }

  return (
    <div id="booking-form-container">
      <h2 id="booking-header">{booking ? 'Edit' : 'Create'} Booking</h2>
      <div id="booking-errors-cont">
        {Object.values(errors).map(error => <span className="errors">{error}</span>)}
      </div>
      <form id="booking-form" onSubmit={handleBookingSubmit}>

        <div className="booking-form-field">
          <label htmlFor="start-date">Start Date</label>
          <input
            id="start-date"
            type="date"
            onChange={e => setStart(e.target.value)}
            value={start}
          />
        </div>

        <div className="booking-form-field">
          <label htmlFor="end-date">End Date</label>
          <input
            id="end-date"
            type="date"
            onChange={e => setEnd(e.target.value)}
            value={end}
          />
        </div>

        <button disabled={!start || !end} className="booking-button" id="submit-booking-button" onClick={handleBookingSubmit}>{booking ? 'Edit' : 'Create'} Booking</button>
        {booking && <button className="booking-button" id="cancel-booking-button" onClick={handleBookingDelete}>Delete Booking</button>}
      </form>
    </div>
  )
}
