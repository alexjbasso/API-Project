import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { createSpotThunk, updateSpotThunk, createSpotImageThunk } from "../../store/spots";

function SpotForm({ spot, formType }) {
  const history = useHistory();
  const [country, setCountry] = useState(spot?.country);
  const [address, setAddress] = useState(spot?.address);
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  const [description, setDescription] = useState(spot?.description);
  const [name, setName] = useState(spot?.name);
  const [price, setPrice] = useState(spot?.price);
  const [preview, setPreview] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [errors, setErrors] = useState({});
  const [imageErrors, setImageErrors] = useState({});

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setImageErrors({});

    const formData = { address, country, city, state, description, name, price, lat: 49, lng: 49 }

    if (formType === 'Create Spot') {

      const newSpot = await dispatch(createSpotThunk(formData));
      spot = newSpot;

      if (!spot.error && !spot.errors) {

        const images = ([preview, image1, image2, image3, image4].map((url, index) => ({
          url,
          preview: index === 0
        }))).filter(item => item.url !== '');

        for (let image of images) {
          await dispatch(createSpotImageThunk(spot, image))
        }
      }

    } else if (formType === 'Update Spot') {
      const editedSpot = await dispatch(updateSpotThunk(spot, formData));
      spot = editedSpot;
    }


    if (spot.error || spot.errors) {
      setErrors(spot.error);
    } else {
      console.log("created spot:", spot)
      history.push(`/spots/${spot.spot.id}`);
    };
  }

  return (
    <div className="create-spot-wrapper">
      <form className="create-spot-form" onSubmit={handleSubmit}>
        <h1>{formType}</h1>

        <div className="create-location-section">
          <h3>Where's your place located?</h3>
          <p>Guests will only get your exact address once they've booked a reservation.</p>

          <div className="spot-field">
            <div className="errors">{errors.country}</div>
            <label htmlFor="country">Country</label>
            <input
              id="country"
              type="text"
              placeholder="Country"
              onChange={e => setCountry(e.target.value)}
              value={country}
            />
          </div>
          <div className="spot-field">
            <div className="errors">{errors.address}</div>
            <label htmlFor="address">Street Address</label>
            <input
              id="address"
              type="text"
              placeholder="Address"
              onChange={e => setAddress(e.target.value)}
              value={address}
            />
          </div>
          <div className="city-state-field">
            <div className="spot-field">
              <div className="errors">{errors.city}</div>
              <label htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                placeholder="City"
                onChange={e => setCity(e.target.value)}
                value={city}
              />
            </div>
            <div className="spot-field">
              <div className="errors">{errors.state}</div>
              <label htmlFor="state">State</label>
              <input
                id="state"
                type="text"
                placeholder="State"
                onChange={e => setState(e.target.value)}
                value={state}
              />
            </div>
          </div>
        </div>

        <div className="create-description-section">
          <h3>Describe your place to guests</h3>
          <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
          <div className="errors">{errors.description}</div>
          <textarea
            id="description"
            name="decription"
            placeholder="Please write at least 30 characters"
            onChange={e => setDescription(e.target.value)}
            value={description}
          />
        </div>

        <div className="create-title-section">
          <h3>Create a title for your spot</h3>
          <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
          <div className="errors">{errors.name}</div>
          <input
            id="title"
            type="text"
            placeholder="Name of your spot"
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </div>

        <div className="create-price-section">
          <h3>Set a base price for your spot</h3>
          <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
          <div className="errors">{errors.price}</div>
          <input
            id="price"
            type="number"
            placeholder="Price per night (USD)"
            onChange={e => setPrice(e.target.value)}
            value={price}
          />
        </div>
        {formType === "Create Spot" ?
          <div className="create-photos">
            <h3>Liven up your spot with photos</h3>
            <p>Submit a link to at least one photo to publish your spot. (Preview required.)</p>
            <div className="errors">{imageErrors.preview}</div>
            <input
              id="preview"
              type="text"
              placeholder="Preview Image URL"
              onChange={e => setPreview(e.target.value)}
              value={preview}
            />
            <input
              id="image-1"
              type="text"
              placeholder="Image URL"
              onChange={e => setImage1(e.target.value)}
              value={image1}
            />
            <input
              id="image-2"
              type="text"
              placeholder="Image URL"
              onChange={e => setImage2(e.target.value)}
              value={image2}
            />
            <input
              id="image-3"
              type="text"
              placeholder="Image URL"
              onChange={e => setImage3(e.target.value)}
              value={image3}
            />
            <input
              id="image-4"
              type="text"
              placeholder="Image URL"
              onChange={e => setImage4(e.target.value)}
              value={image4}
            />
          </div>
          : null}
        <button
          type="submit"
          disabled={formType === "Create Spot" ? (!country && !address && !city && !state && !description && !name && !price) || !preview : !country && !address && !city && !state && !description && !name && !price}
        >{formType}
        </button>

      </form>
    </div >
  )
}

export default SpotForm;
