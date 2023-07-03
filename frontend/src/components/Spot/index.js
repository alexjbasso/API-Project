import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSpotDetails } from "../../store/spotDetails";
import { fetchReviews } from "../../store/reviews";
import Reviews from "./Reviews";
import SpotDetails from "./SpotDetails";

function SpotPage() {

  const { spotId } = useParams();

  const spot = useSelector((state) =>
    state.spotDetails[spotId] ? state.spotDetails[spotId] : null
  );

  const reviews = useSelector((state) =>
    state.reviews[spotId] ? state.reviews[spotId] : null
  );

  const user = useSelector((state) =>
    state.session.user ? state.session.user : null
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSpotDetails(spotId))
    dispatch(fetchReviews(spotId))
  }, [dispatch, spotId])

  if (spot && reviews)
    return (
      <div className="spot-page-container">
        <SpotDetails spot={spot} reviews={reviews} />
        <Reviews reviews={reviews} spot={spot} user={user} />
      </div>
    )

}

export default SpotPage;
