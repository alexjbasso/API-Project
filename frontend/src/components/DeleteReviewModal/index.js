import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteReviewThunk } from '../../store/reviews';

function DeleteReviewModal({ review }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = () => {
    dispatch(deleteReviewThunk(review.id));
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <div className="delete-review-wrapper">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this review?</p>
      <button onClick={handleDelete}>Yes (Delete Review)</button>
      <button onClick={handleCancel}>No (Keep Review)</button>
    </div>

  )
}

export default DeleteReviewModal;
