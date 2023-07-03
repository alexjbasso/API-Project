import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpots } from "../../store/spots";
import LandingSpotDetails from "./LandingSpotDetails";


function AllSpots() {

  const spots = Object.values(
    useSelector((state) => (state.spots ? state.spots : []))
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  return (
    <>{
      spots.map((spot) => (
        <LandingSpotDetails spot={spot} />
      ))
    }
    </>

  )
}

export default AllSpots;
