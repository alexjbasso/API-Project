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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpotByIdThunk(spotId));
  }, [dispatch, spotId]);

  if (!spot) return (<></>);

  return (
    Object.keys(spot).length > 1 && (
      <SpotForm
        spot={spot}
        formType="Update Spot"
      />
    )
  )
};

export default UpdateSpot;
