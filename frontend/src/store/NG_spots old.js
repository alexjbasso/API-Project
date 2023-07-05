import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const LOAD_SPOTS = 'spots/LOAD_SPOTS';
export const CREATE_SPOT = 'spots/CREATE_SPOT';
export const UPDATE_SPOT = 'spots/UPDATE_SPOT';

/**  Action Creators: */
export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots
});

export const createSpot = (spot) => ({
  type: CREATE_SPOT,
  spot
});

export const editSpot = (spot) => ({
  type: UPDATE_SPOT,
  spot
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

//Create a Spot Thunk
export const createSpotThunk = (formData) => async (dispatch) => {
  console.log('Create spot thunk running, this is the formData', formData)
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  console.log('After csrf fetch, this is the response', response)
  if (response.ok) {
    const spot = await response.json();
    console.log('If response is okay running, this is spot', spot)
    for (const image of formData.images) {
      if (image.url) {
        await dispatch(createImageforSpotThunk(spot, image));
      }
    }
    return spot;
  } else {
    const errorData = await response.json();
    return errorData;
  }
};

//Create Spot Image Thunk
export const createImageforSpotThunk = (spot, images) => async (dispatch) => {
  console.log('Create Image for Spot Thunk, this is spot and image ', spot, images)
  const response = await csrfFetch(`/api/spots/${spot.id}/images`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(images),
  });
  if (response.ok) {
    const newImage = await response.json();
    console.log('THIS IS NEW IMAGE RESPONSE', newImage)
    spot.previewImage = newImage.url;
    dispatch(createSpotAction(spot));
    return newImage;
  } else {
    const errorData = await response.json();
    return errorData;
  }
};

//Edit/Update a Spot Thunk
export const updateSpotThunk = (spot) => async (dispatch) => {
  // console.log('Edit/Update a Spot Thunk, this is spot  ', spot);
  const response = await csrfFetch(`/api/spots/${spot.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spot),
  });

  if (response.ok) {
    const spot = await response.json();
    dispatch(updateSpotAction(spot));
    return spot;
  } else {
    const errorData = await response.json();
    return errorData;
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
      case CREATE_SPOT:
        return {...state, allSpots: {  ...state.allSpots, [action.spot.id]: action.spot }};
      case UPDATE_SPOT:
        return {...state, singleSpot: { [action.spot.id]: action.spot}};
    default:
      return state;
  }
};

export default spotsReducer;
