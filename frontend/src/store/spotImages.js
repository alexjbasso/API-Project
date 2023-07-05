/** Action Type Constants: */
export const RECEIVE_SPOT_IMAGE = 'spotImages/RECEIVE_SPOT_IMAGE';


/**  Action Creators: */
export const receiveSpotImage = (image) => ({
  type: RECEIVE_SPOT_IMAGE,
  image
})


/** Thunk Action Creators: */
export const createSpotImage = (spot, image) => async (dispatch) => {
  const res = await fetch(`/api/spot/${spot.id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(image),
  })

  if (res.ok) {
    const newImage = await res.json();
    dispatch(receiveSpotImage(newImage));
    return newImage;
  } else {
    const errors = await res.json();
    return errors;
  }
}
