import { __esModule } from "react-router-dom/cjs/react-router-dom.min";

/** Action Type Constants: */
export const LOAD_REVIEW = 'reviews/LOAD_REVIEWS';

/**  Action Creators: */
export const loadReviews = (reviews, spotId) => ({
  type: LOAD_REVIEW,
  reviews,
  spotId
})

/** Thunk Action Creators: */
export const fetchReviews = (spotId) => async (dispatch) => {
  const res= await fetch(`/api/spots/${spotId}/reviews`);

  if (res.ok) {
    const reviews = await res.json();
    return dispatch(loadReviews(reviews, spotId))
  }
}

/** Reducer: */
const reviewsReducer = (state = {}, action) => {
  switch(action.type) {
    case LOAD_REVIEW:
      const reviewsState = {};
      const reviewsList = [];
      action.reviews.Reviews.forEach((review) => {
        reviewsList.push(review)
      });
      reviewsState[action.spotId] = reviewsList;
      return reviewsState
    default:
      return state;
  }
}

export default reviewsReducer;
