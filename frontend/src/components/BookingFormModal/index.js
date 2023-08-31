import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal';
import { createBookingThunk, editBookingThunk } from "../../store/bookings";

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

  console.log("ErRoRs:", errors)

  return (
    <div id="booking-form-container">
      <h2>{booking ? 'Edit Booking' : 'Create Booking'}</h2>
      <div id="booking-errors-cont">
        {Object.values(errors).map(error => <span>{error}</span>)}
      </div>
      <form id="booking-form" onSubmit={handleBookingSubmit}>
        <label htmlFor="start-date">Start Date</label>
        <input
          id="start-date"
          type="date"
          onChange={e => setStart(e.target.value)}
          value={start}
        />

        <label htmlFor="end-date">End Date</label>
        <input
          id="end-date"
          type="date"
          onChange={e => setEnd(e.target.value)}
          value={end}
        />

        <button type="submit" disabled={!start || !end} id="submit-form-button">Submit</button>
      </form>
    </div>
  )
}
