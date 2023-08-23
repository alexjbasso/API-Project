import ReserveButton from "./ReserveButton";
import './SpotDetails.css'

function SpotDetails({ spot, reviews, user }) {

  if (spot.SpotImages) {
    const spotImages = spot.SpotImages
    const preview = spotImages.find(image => image.preview === true);
    const otherImages = spotImages.filter(image => image.preview === false);

    return (
      <div className="spot-details-container">

        <h2 className="spot-name">{spot.name}</h2>
        <h3 className="location-text">{spot.city}, {spot.state}, {spot.country}</h3>

        <div className="images-container">
          <img className="preview-image" src={preview?.url} alt="preview image"></img>

          <div className="other-spot-images">
            <div className="image-wrapper" id="image-wrapper-1">
              {otherImages[0] ? <img className="other-spot-image" src={otherImages[0].url} key={otherImages[0].id} alt="spot image1"></img> :
                null
              }
            </div>
            <div className="image-wrapper" id="image-wrapper-2">
              {otherImages[1] ? <img className="other-spot-image" src={otherImages[1].url} key={otherImages[1].id} alt="spot image2"></img> :
                null
              }
            </div>
            <div className="image-wrapper" id="image-wrapper-3">
              {otherImages[2] ? <img className="other-spot-image" src={otherImages[2].url} key={otherImages[2].id} alt="spot image3"></img> :
                null
              }
            </div>
            <div className="image-wrapper" id="image-wrapper-4">
              {otherImages[3] ? <img className="other-spot-image" src={otherImages[3].url} key={otherImages[3].id} alt="spot image4"></img> :
                null
              }
            </div>
          </div>
        </div>


        <div className="spot-text-container">

          <div className="spot-details-text">
            <h2 className="hosts">Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
            <p className="spot-description">{spot.description}</p>
          </div >

          <div id="reserve-button-wrapper">
            <ReserveButton spot={spot} reviews={reviews} user={user} />
          </div>

        </div>
      </div>
    )
  }

}

export default SpotDetails;
