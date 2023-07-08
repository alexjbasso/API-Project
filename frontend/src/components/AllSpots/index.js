import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../store/spots";
import SpotContainer from "./SpotContainer";
import './AllSpots.css'


function AllSpots() {

  const spots = Object.values(
    useSelector((state) => (state.spots.allSpots ? state.spots.allSpots : []))
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  return (
    <div className="spot-grid-body">
      {
        spots.map((spot) => (
          <div className="spot-comp-wrapper">
            <SpotContainer spot={spot} type="all-spots" />
          </div>

        ))
      }
    </div>

  )
}

export default AllSpots;
