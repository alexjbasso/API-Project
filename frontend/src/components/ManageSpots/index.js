import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserAllSpotsThunk } from "../../store/spots";
import { Link } from "react-router-dom";
import SpotContainer from "../AllSpots/SpotContainer";
import './ManageSpots.css'

function ManageSpots() {

  const spots = Object.values(
    useSelector((state) => (state.spots.allSpots ? state.spots.allSpots : []))
  );

  const user = useSelector((state) =>
    state.session.user ? state.session.user : null
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) dispatch(getCurrentUserAllSpotsThunk());
  }, [dispatch]);

  if (user) {
    return (
      <div className="manage-spots-page-wrapper">
        <h1>Manage Your Spots</h1>

        <div className="user-spots-wrapper">
          {spots.length ? null : <Link to="/spots/new"><button class="spot-button">Create a New Spot</button></Link>}
          {
            spots.map((spot) => (
              <SpotContainer spot={spot} type="manage" />
            ))
          }
        </div>

      </div>
    )
  } else return (
    <h1>You need to be logged in to access this page.</h1>
  )

}


export default ManageSpots;
