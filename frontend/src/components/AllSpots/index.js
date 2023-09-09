import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../store/spots";
import SpotContainer from "./SpotContainer";
import './AllSpots.css'


function AllSpots() {

  let spots = Object.values(
    useSelector((state) => (state.spots.allSpots ? state.spots.allSpots : []))
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);


  if (spots.length) {
    spots = spots.reverse()

    return (
      <div id="home-page-wrapper">
        <h1>Welcome to ToonBnb</h1>
        <h2><em>Find where you belong</em></h2>
        <div className="spot-grid-body">
          {
            spots.map((spot) => (
              <div className="spot-comp-wrapper">
                <SpotContainer spot={spot} type="all-spots" />
              </div>

            ))
          }
        </div>

      </div>

    )
  } else {
    return (
      <h1>No spots! Log in and create your own.</h1>
    )
  }

}

export default AllSpots;
