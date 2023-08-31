import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const LOAD_BOOKINGS = 'bookings/LOAD_BOOKINGS';
export const LOAD_USER_BOOKINGS = 'bookings/LOAD_USER_BOOKINGS';
export const LOAD_BOOKING = 'bookings/LOAD_BOOKING';
export const DELETE_BOOKING = 'bookings/DELETE_BOOKING';
export const CREATE_BOOKING = 'bookings/CREATE_BOOKING';
export const EDIT_BOOKING = 'bookings/EDIT_BOOKING';
export const CLEAR_BOOKINGS = 'bookings/CLEAR_BOOKINGS';

/**  Action Creators: */
export const loadBookingsAction = (bookings) => ({
  type: LOAD_BOOKINGS,
  bookings
});

export const loadUserBookingsAction = (bookings) => ({
  type: LOAD_USER_BOOKINGS,
  bookings
});

export const loadBookingAction = (booking) => ({
  type: LOAD_BOOKING,
  booking
});

export const createBookingAction = (booking) => ({
  type: CREATE_BOOKING,
  booking
});

export const editBookingAction = (booking) => ({
  type: EDIT_BOOKING,
  booking
});

export const deleteBookingAction = (bookingId) => ({
  type: DELETE_BOOKING,
  bookingId
});

export const clearBookingsAction = () => {
  return { type: CLEAR_BOOKINGS }
}

/** Thunk Action Creators: */
// Get all bookings for a spot
export const getAllBookingsForSpotThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/bookings`);

  if (res.ok) {
    const bookings = await res.json();
    return dispatch(loadBookingsAction(bookings.Bookings, spotId))
  }
}


// Get all bookings of user
export const getBookingsOfUserThunk = () => async (dispatch) => {
  const res = await csrfFetch(`/api/bookings/current`);
  const bookings = await res.json();
  dispatch(loadUserBookingsAction(bookings.Bookings));
  return res;
};


// Create a booking
export const createBookingThunk = (spotId, formData) => async (dispatch) => {

  try {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    console.log("res:", res)
    const booking = await res.json();
    return dispatch(createBookingAction(booking));
  } catch (err) {
    return { errors: (await err.json()).error }
  }
};

// Edit a booking
export const editBookingThunk = (bookingId, formData) => async (dispatch) => {

  try {
    const res = await csrfFetch(`/api/bookings/${bookingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const booking = await res.json();
    return dispatch(editBookingAction(booking));
  } catch (err) {
    return { errors: await err.json() }
  }
};

export const deleteBookingThunk = (bookingId) => async (dispatch) => {
  const res = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    dispatch(deleteBookingAction(bookingId));
    return res;
  }
};

/** Reducer: */
const initialState = {
  spotBookings: {},
  userBookings: {},
  singleBooking: {}
}
const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_BOOKINGS:
      const spotBookingsObj = {};
      if (action.bookings) {
        action.bookings.forEach((booking) => {
          spotBookingsObj[booking.id] = booking;
        });
      }
      return { ...state, spotBookings: spotBookingsObj };
    case LOAD_USER_BOOKINGS:
      const userBookingsObj = {};
      if (action.bookings) {
        action.bookings.forEach((booking) => {
          userBookingsObj[booking.id] = booking;
        });
      }
      return { ...state, userBookings: userBookingsObj };
    case LOAD_BOOKING:
      return { ...state, singleBooking: { [action.booking.id]: action.booking } };
    case CREATE_BOOKING:
      return { ...state, userBookings: { ...state.userBookings, [action.booking.id]: action.booking } };
    case EDIT_BOOKING:
      return { ...state, userBookings: { ...state.userBookings, [action.booking.id]: action.booking } };
    case DELETE_BOOKING:
      const newBookings = { ...state.userBookings };
      delete newBookings[action.bookingId];
      return { ...state, userBookings: newBookings };
    default:
      return state;
  }
};

export default bookingReducer;
