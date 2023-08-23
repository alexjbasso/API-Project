import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal';
import { createBookingThunk } from "../../store/bookings";

export default function BookingFormModal({ spot }) {
  const dispatch = useDispatch();
  const [start, setStart] = useState("s");
  const [end, setEnd] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  // console.log("Start:", start)
  // console.log("End:", end)
  // console.log("!start || !end", !start || !end)
  console.log("top modal component rendered")

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    console.log("sub Start:", start)
    console.log("sub End:", end)

    const formData = { startDate: start, endDate: end }
    console.log("formdata:", formData)
    // await dispatch(createBookingThunk(spot.id, formData))

    closeModal();
  }

  useEffect(() => {
    console.log("Start:", start)
    console.log("End:", end)
  }, [start, end])

  return (
    <div id="booking-form-container">
      <h2>Create Booking</h2>
      <form id="booking-form" onSubmit={handleBookingSubmit}>
        <label htmlFor="start-date">Start Date{start}</label>
        <input
          id="start-date"
          type="text"
          onChange={e => setStart(e.target.value)}
          value={start}
        />

        <label htmlFor="end-date">End Date</label>
        <input
          id="end-date"
          type="text"
          onChange={e => setEnd(e.target.value)}
          value={end}
        />

        <button type="submit" id="submit-form-button">Submit</button>
      </form>
    </div>
  )
}
