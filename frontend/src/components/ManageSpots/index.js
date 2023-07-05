import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserAllSpotsThunk } from "../../store/spots";
import { Link } from "react-router-dom";
import LandingSpotDetails from "../AllSpots/LandingSpotDetails";

function ManageSpots() {

  const spots = Object.values(
    useSelector((state) => (state.spots.allSpots ? state.spots.allSpots : []))
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUserAllSpotsThunk());
  }, [dispatch]);

    return (
      <div className="user-spots-wrapper">
        <h1>Manage Your Spots</h1>

        {spots.length ? null : <Link to="/spots/new"><button>Create a New Spot</button></Link>}

        {
          spots.map((spot) => (
            <LandingSpotDetails spot={spot} type="manage" />
          ))
        }
      </div>
    )
  } 


export default ManageSpots;
