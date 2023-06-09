import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteSpotThunk } from '../../store/spots';
import './DeleteSpotModal.css';

function DeleteSpotModal({ spot }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = () => {
    dispatch(deleteSpotThunk(spot.id));
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <div className="delete-spot-wrapper">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this spot from the listings?</p>
      <button className="delete-button" id="delete-spot" onClick={handleDelete}>Yes (Delete Spot)</button>
      <button className="delete-button" id="keep-spot" onClick={handleCancel}>No (Keep Spot)</button>
    </div>

  )
}

export default DeleteSpotModal;
