import { csrfFetch } from "./csrf";

/** Action Type Constants: */
const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const LOAD_SPOT = 'spots/LOAD_SPOT';
const CREATE_SPOT = 'spots/CREATE_SPOT';
const UPDATE_SPOT = 'spots/UPDATE_SPOT';
const DELETE_SPOT = 'spots/DELETE_SPOT';


/**  Action Creators: */
export const getAllSpotsAction = (spots) => ({
  type: LOAD_SPOTS,
  spots
});

export const getSpotByIdAction = (spot) => ({
  type: LOAD_SPOT,
  spot
});

export const createSpotAction = (spot) => ({
  type: CREATE_SPOT,
  spot
});

export const updateSpotAction = (spot) => ({
  type: UPDATE_SPOT,
  spot
});

export const deleteSpotAction = (spotId) => ({
  type: DELETE_SPOT,
  spotId
});


/** Thunk Action Creators: */
export const getAllSpotsThunk = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots');
  const spots = await res.json();
  return dispatch(getAllSpotsAction(spots.Spots));
};

export const getCurrentUserAllSpotsThunk = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots/current');
  const spots = await res.json();
  return dispatch(getAllSpotsAction(spots.Spots));
};

export const getSpotByIdThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);
  const spot = await res.json();
  return dispatch(getSpotByIdAction(spot));
};

export const createSpotThunk = (formData) => async (dispatch) => {

  try {
    const res = await csrfFetch('/api/spots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const spot = await res.json();
    return dispatch(createSpotAction(spot));
  } catch (err) {
    return await err.json()
  }
};

export const createSpotImageThunk = (spot, image) => async () => {

  await csrfFetch(`/api/spots/${spot.spot.id}/images`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(image),
  });

};

export const updateSpotThunk = (spotId, formData) => async (dispatch) => {
  
  try {
    const res = await csrfFetch(`/api/spots/${spotId.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const spot = await res.json();
    return dispatch(updateSpotAction(spot));
  } catch (err) {
    return await err.json()
  }
};

export const deleteSpotThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    dispatch(deleteSpotAction(spotId));
    return res;
  }
};


/** Reducer: */
const initialState = {
  allSpots: {},
  singleSpot: {}
}

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      const allSpotsObj = {};
      if (action.spots) {
        action.spots.forEach((spot) => {
          allSpotsObj[spot.id] = spot;
        });
      }
      return { ...state, allSpots: allSpotsObj };
    case LOAD_SPOT:
      return { ...state, singleSpot: { [action.spot.id]: action.spot } };
    case CREATE_SPOT:
      return { ...state, allSpots: { ...state.allSpots, [action.spot.id]: action.spot } };
    case UPDATE_SPOT:
      return { ...state, singleSpot: { [action.spot.id]: action.spot } };
    case DELETE_SPOT:
      const newSpots = { ...state.allSpots };
      delete newSpots[action.spotId];
      return { ...state, allSpots: newSpots };
    default:
      return state;
  }
};

export default spotReducer;
