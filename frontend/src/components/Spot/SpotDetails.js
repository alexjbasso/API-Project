import ReserveButton from "./ReserveButton";
import './SpotDetails.css'

function SpotDetails({ spot, reviews }) {

  if (spot.SpotImages) {
    const spotImages = spot.SpotImages
    const preview = spotImages.find(image => image.preview === true);
    const otherImages = spotImages.filter(image => image.preview === false);

    return (
      <div className="spot-details-container">

        <h2 className="spot-name">{spot.name}</h2>
        <h3 className="location-text">{spot.city}, {spot.state}, {spot.country}</h3>

        <div className="images-container">
          <img className="preview-image" src={preview?.url}></img>

          <div className="other-spot-images">
            <div className="image-wrapper" id="image-wrapper-1">
              {otherImages[0] ? <img className="other-spot-image" src={otherImages[0].url} key={otherImages[0].id}></img> : <img className="other-spot-image" src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" key="1"></img>}
            </div>
            <div className="image-wrapper" id="image-wrapper-2">
              {otherImages[1] ? <img className="other-spot-image" src={otherImages[1].url} key={otherImages[1].id}></img> : <img className="other-spot-image" src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" key="1"></img>}
            </div>
            <div className="image-wrapper" id="image-wrapper-3">
              {otherImages[2] ? <img className="other-spot-image" src={otherImages[2].url} key={otherImages[2].id}></img> : <img className="other-spot-image" src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" key="1"></img>}
            </div>
            <div className="image-wrapper" id="image-wrapper-4">
              {otherImages[3] ? <img className="other-spot-image" src={otherImages[3].url} key={otherImages[3].id}></img> : <img className="other-spot-image" src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" key="1"></img>}
            </div>

            {/* {otherImages.map(image => (
              <div className="image-wrapper">
                <img className="other-spot-image" src={image.url} key={image.id}></img>
              </div>
            ))} */}


          </div>
        </div>


        <div className="spot-text-container">

          <div className="spot-details-text">
            <h2 className="hosts">Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
            <p className="spot-description">{spot.description}</p>
          </div >

          <div id="reserve-button-wrapper">

            <ReserveButton spot={spot} reviews={reviews} />
          </div>

        </div>
      </div>
    )
  }


  return (
    <div className="spot-details-container">
      <h2 className="spot-name">{spot.name}</h2>
      <h3 className="location-text">{spot.city}, {spot.state}, {spot.country}</h3>
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
