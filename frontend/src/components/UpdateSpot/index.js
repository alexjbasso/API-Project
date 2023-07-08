import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotByIdThunk } from "../../store/spots"
import SpotForm from "../SpotForm";

const UpdateSpot = () => {
  let { spotId } = useParams()
  const spot = useSelector((state) =>
    state.spots.singleSpot[spotId] ? state.spots.singleSpot[spotId] : null
  );

  const user = useSelector((state) =>
    state.session.user ? state.session.user : null
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpotByIdThunk(spotId));
  }, [dispatch, spotId]);

  if (!spot) return (<h1>Spot does not exist</h1>);

  console.log(spot.ownerId, user.id)

  if (spot.ownerId === user.id) {
    return (
      Object.keys(spot).length > 1 && (
        <SpotForm
          spot={spot}
          formType="Update Spot"
        />
      )
    )
  } else {
    return <h1>You do not have permission to do that.</h1>
  }
};

export default UpdateSpot;
