import { Link } from "react-router-dom";
import OpenModalButton from "../OpenModalButton"
import DeleteSpotModal from "../DeleteSpotModal";

function LandingSpotDetails({ spot, type }) {

  return (
    <div className="spot-container" id={`${spot.id}`} title={spot.name}>
      <Link to={`/spots/${spot.id}`} id={spot.id}>
        <img src={spot.preview ? spot.preview : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"}></img>
        <div>
          <span className="location">{spot.city}, {spot.state}</span>
          <div className="spot-row-2">
            <span className="rating-info">
              <i className="fa-solid fa-star" />
              <span>{spot.avgRating ? spot.avgRating.toFixed(2) : "New"}</span>
            </span>
          </div>
          <span className="price-info">${spot.price} night</span>
        </div>
      </Link>
      {type === "manage" ?
        <div className="spot-buttons">
          <Link to={`/spots/${spot.id}/edit`}><button>Update</button></Link>
          <OpenModalButton
            buttonText="Delete"
            modalComponent={<DeleteSpotModal spot={spot} />}
          />
        </div>
        : null}
    </div>
  )
};

export default LandingSpotDetails;
