import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { createReviewThunk } from '../../store/reviews';
import StarsRatingInput from './StarsRatingInput';
import "./index.css"

function CreateReviewModal({ spot }) {
  const dispatch = useDispatch();
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState('');
  const [errors, setErrors] = useState('');
  const { closeModal } = useModal();


  const handleSubmit = () => {
    setErrors({});

    const formData = { review: reviewText, stars: rating }

    dispatch(createReviewThunk(spot.id, formData));
    closeModal();
  };

  const onChange = (number) => {
    setRating(parseInt(number));
  };

  return (
    <div className="create-review-wrapper">
      <form id="create-review-form" onSubmit={handleSubmit}>
        <h2>How was your stay?</h2>
        <textarea
          id="review-text-area"
          name="review-text-area"
          placeholder='Leave your review here...'
          onChange={e => setReviewText(e.target.value)}
          value={reviewText}
        />
        <div className='stars-input-wrapper'>
          <StarsRatingInput
            onChange={onChange}
            rating={rating} />
        </div>
        <button id="submit-review-button" disabled={reviewText.length < 10 || rating < 1} >Submit Your Review</button>
      </form>
    </div>

  )
}

export default CreateReviewModal;
