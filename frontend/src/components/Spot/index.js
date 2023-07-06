import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotByIdThunk } from "../../store/spots";
import { getReviewsThunk, clearReviewsAction } from "../../store/reviews";
import Reviews from "./Reviews";
import SpotDetails from "./SpotDetails";

function SpotPage() {

  const { spotId } = useParams();

  const spot = useSelector((state) =>
    state.spots.singleSpot[spotId] ? state.spots.singleSpot[spotId] : null
  );

  const reviews = Object.values(useSelector((state) =>
    state.reviews ? state.reviews : null
  ));

  const user = useSelector((state) =>
    state.session.user ? state.session.user : null
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpotByIdThunk(spotId))
    dispatch(getReviewsThunk(spotId))
  }, [dispatch, spotId, reviews.length])

  useEffect(() => {
    return () => {
      dispatch(clearReviewsAction())
    }
  }, [dispatch])

  if (spot)
    return (
      <div className="spot-page-container">
        {<SpotDetails spot={spot} reviews={reviews} />}
        <Reviews reviews={reviews} spot={spot} user={user} />
      </div>
    )

}

export default SpotPage;
