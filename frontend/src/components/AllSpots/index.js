import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../store/spots";
import LandingSpotDetails from "./LandingSpotDetails";


function AllSpots() {

  const spots = Object.values(
    useSelector((state) => (state.spots.allSpots ? state.spots.allSpots : []))
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  return (
    <>{
      spots.map((spot) => (
        <LandingSpotDetails spot={spot} type="all-spots"/>
      ))
    }
    </>

  )
}

export default AllSpots;
