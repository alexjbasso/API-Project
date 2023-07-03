import ReserveButton from "./ReserveButton";

function SpotDetails({ spot, reviews }) {

  return (
    <div className="spot-details-container">
      <h1>{spot.name}</h1>
      <h3>{spot.city}, {spot.state}, {spot.country}</h3>
      <div className="images-container">
        <div>Preview </div>
        <div>
          Other Images
        </div>
      </div>
      <div className="spot-text-container">
        <div className="spot-details-text">
          <h2 className="hosts">Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
          <p className="spot-description">{spot.description}</p>
        </div>
        <ReserveButton spot={spot} reviews={reviews}/>
      </div>
    </div>
  )
}

export default SpotDetails;
