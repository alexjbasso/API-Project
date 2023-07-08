import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteReviewThunk } from '../../store/reviews';
import "./DeleteReviewModal.css"

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
      <button className="delete-button" id="delete-review" onClick={handleDelete}>Yes (Delete Review)</button>
      <button className="delete-button" id="keep-review" onClick={handleCancel}>No (Keep Review)</button>
    </div>

  )
}

export default DeleteReviewModal;
