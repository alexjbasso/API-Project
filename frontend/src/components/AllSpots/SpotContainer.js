import { Link } from "react-router-dom";
import OpenModalButton from "../OpenModalButton"
import DeleteSpotModal from "../DeleteSpotModal";
import "./SpotContainer.css"
function SpotContainer({ spot, type }) {

  return (
    <div className="spot-container" id={`${spot.id}`} title={spot.name}>
      <Link className="spot-link" to={`/spots/${spot.id}`} id={spot.id}>

        <div className="image-container">
          <img src={spot.preview ? spot.preview : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"}></img>
        </div>

        <div className="spot-details-info">

          <div className="location-revsum">
              <span className="location">{spot.city}, {spot.state}</span>
            <div className="spot-row-2">
              <span className="rating-info">
                <i className="fa-solid fa-star" />
                <span>{spot.avgRating ? spot.avgRating.toFixed(2) : "New"}</span>
              </span>
            </div>
          </div>

          <div>
            <span className="price-info">${spot.price}</span>
            <span> night</span>
          </div>
        </div>


      </Link>
      {type === "manage" ?
        <div className="spot-buttons">

          <Link to={`/spots/${spot.id}/edit`}><button className="spot-button">Update</button></Link>

          <OpenModalButton
            className="spot-button"
            buttonText="Delete"
            modalComponent={<DeleteSpotModal spot={spot} />}
          />
        </div>
        : null}
    </div>
  )
};

export default SpotContainer;
