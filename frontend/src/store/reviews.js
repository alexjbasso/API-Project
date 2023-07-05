import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
export const DELETE_REVIEW = 'reviews/DELETE_REVIEW';
export const CREATE_REVIEW = 'reviews/CREATE_REVIEW'


/**  Action Creators: */
export const loadReviewsAction = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews
});

export const createReviewAction = (review) => ({
  type: CREATE_REVIEW,
  review
});

export const deleteReviewAction = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId
});

/** Thunk Action Creators: */
export const fetchReviews = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (res.ok) {
    const reviews = await res.json();
    return dispatch(loadReviewsAction(reviews, spotId))
  }
}

export const getReviewsThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
  const reviews = await res.json();
  dispatch(loadReviewsAction(reviews));
  return res;
};

export const createReviewThunk = (spotId, formData) => async (dispatch) => {

  try {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const review = await res.json();
    return dispatch(createReviewAction(review));
  } catch (err) {
    return await err.json()
  }
};

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    dispatch(deleteReviewAction(reviewId));
    return res;
  }
};

/** Reducer: */
const reviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_REVIEWS:
      const reviewsObj = {};
      action.reviews.Reviews.forEach((review) => {
        reviewsObj[review.id] = review;
      });
      return reviewsObj;
    case CREATE_REVIEW:
      return {...state, [action.review.id]: action.review}
    case DELETE_REVIEW:
      const newReviews = { ...state };
      // console.log("before:", newReviews)
      // console.log("action.review:", action.reviewId)
      delete newReviews[action.reviewId];
      // console.log("after", newReviews)
      return newReviews;
    default:
      return state;
  }
}

export default reviewsReducer;
