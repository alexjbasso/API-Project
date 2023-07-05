import ReserveButton from "./ReserveButton";
import './SpotDetails.css'

function SpotDetails({ spot, reviews }) {

  if (spot.SpotImages) {
    const spotImages = spot.SpotImages
    const preview = spotImages.find(image => image.preview === true);
    const otherImages = spotImages.filter(image => image.preview === false);

    return (
      <div className="spot-details-container">
        <h1>{spot.name}</h1>
        <h3>{spot.city}, {spot.state}, {spot.country}</h3>
        <div className="images-container">
          <img src={preview?.url}></img>
          <div className="other-spot-images">{
            otherImages.map(image => (
              <img className="other-spot-image" src={image.url} key={image.id}></img>
            ))
          }
          </div>
        </div>
        <div className="spot-text-container">
          <div className="spot-details-text">
            <h2 className="hosts">Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
            <p className="spot-description">{spot.description}</p>
          </div>
          <ReserveButton spot={spot} reviews={reviews} />
        </div>
      </div>
    )
  }
  return (
    <div className="spot-details-container">
      <h1>{spot.name}</h1>
      <h3>{spot.city}, {spot.state}, {spot.country}</h3>
      <div className="spot-text-container">
        <div className="spot-details-text">
          <h2 className="hosts">Hosted by {spot.Owner ? spot.Owner.firstName : null} {spot.Owner ? spot.Owner.lastName : null}</h2>
          <p className="spot-description">{spot.description}</p>
        </div>
        <ReserveButton spot={spot} reviews={reviews} />
      </div>
    </div >
  )

}

export default SpotDetails;
