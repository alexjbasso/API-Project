/** Action Type Constants: */
export const LOAD_SPOTS = 'spots/LOAD_SPOTS';

/**  Action Creators: */
export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots
});

/** Thunk Action Creators: */

export const fetchSpots = () => async (dispatch) => {
  const res = await fetch('/api/spots');

  if (res.ok) {
    const spots = await res.json();
    return dispatch(loadSpots(spots));
  } else {
    const errors = await res.json();
    return errors;
  }
};

/** Reducer: */
const spotsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      const spotsState = {};
      action.spots.Spots.forEach((spot) => {
        spotsState[spot.id] = spot;
      });
      return spotsState;
    default:
      return state;
  }
};

export default spotsReducer;
