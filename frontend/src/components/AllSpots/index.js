import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSpots } from "../../store/spots";


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
        <div className="spot-container">
          <Link to={`/spots/${spot.id}`} id={spot.id}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"></img>
            <div>
              <span className="location">{spot.city}, {spot.state}</span>
              <div className="spot-row-2">
                <span className="rating-info">
                  <i className="fa-solid fa-star" />
                  <span>{spot.avgRating}</span>
                </span>
              </div>
              <span className="price-info">${spot.price} night</span>
            </div>
          </Link>
        </div>
      ))
    }
    </>

  )
}

export default AllSpots;
