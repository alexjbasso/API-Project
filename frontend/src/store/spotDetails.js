/** Action Type Constants: */
export const LOAD_SPOT_DETAILS = 'spots/LOAD_SPOT_DETAILS';

/**  Action Creators: */
export const loadSpotDetails = (spot) => ({
  type: LOAD_SPOT_DETAILS,
  spot
})

/** Thunk Action Creators: */
export const fetchSpotDetails = (spotId) => async (dispatch) => {

  const res = await fetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const spot = await res.json();
    return dispatch(loadSpotDetails(spot));
  } else {
    const errors = await res.json();
    return errors;
  }
}

/** Reducer: */
const spotDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_SPOT_DETAILS:
      return { ...state, [action.spot.id]: action.spot };
    default:
      return state;
  }
};

export default spotDetailsReducer;
