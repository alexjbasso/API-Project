/** Action Type Constants: */
export const LOAD_SPOTS = 'spots/LOAD_SPOTS';
export const LOAD_SPOT_BY_ID = 'spots/LOAD_SPOT_BY_ID';

/**  Action Creators: */
export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots
});

export const loadSpotById = (spot) => ({
  type: LOAD_SPOT_BY_ID,
  spot
})

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

export const fetchSpotById = (spotId) => async (dispatch) => {

  const res = await fetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const spot = await res.json();
    return dispatch(loadSpotById(spot));
  } else {
    const errors = await res.json();
    return errors;
  }

}

/** Reducer: */
const spotsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      const spotsState = {};
      action.spots.Spots.forEach((spot) => {
        spotsState[spot.id] = spot;
      });
      return spotsState;
    case LOAD_SPOT_BY_ID:
      return { ...state, [action.spot.id]: action.spot };
    default:
      return state;
  }
};

export default spotsReducer;
