import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createSpotThunk, updateSpotThunk, createSpotImageThunk } from "../../store/spots";
import "./SpotForm.css"

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

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const frontEndErrorsObj = {};

    if (!country) frontEndErrorsObj.country = "Country is required";
    if (!address) frontEndErrorsObj.address = "Address is required";
    if (!city) frontEndErrorsObj.city = "City is required";
    if (!state) frontEndErrorsObj.state = "State is required";
    if (!description || (description && description.length < 30)) frontEndErrorsObj.description = "Description needs a minimum of 30 characters";
    if (!name) frontEndErrorsObj.name = "Name is required";
    if (name && name.length >= 50) frontEndErrorsObj.name = "Name must be less than 50 characters";
    if (!price) frontEndErrorsObj.price = "Price is required";
    if (price && (price <= 1 || price > 9999)) frontEndErrorsObj.price = "Price must be between $1 and $9999";
    if (formType === 'Create Spot') {
      if (!preview) frontEndErrorsObj.preview = "Preview image is required";
      if (preview && !preview.match(/\.(png|jpg|jpeg)$/i)) frontEndErrorsObj.preview = "Image URL must end in .png, .jpg, or .jpeg";
      if (image1 && !image1.match(/\.(png|jpg|jpeg)$/i)) frontEndErrorsObj.image1 = "Image URL must end in .png, .jpg, or .jpeg";
      if (image2 && !image2.match(/\.(png|jpg|jpeg)$/i)) frontEndErrorsObj.image2 = "Image URL must end in .png, .jpg, or .jpeg";
      if (image3 && !image3.match(/\.(png|jpg|jpeg)$/i)) frontEndErrorsObj.image3 = "Image URL must end in .png, .jpg, or .jpeg";
      if (image4 && !image4.match(/\.(png|jpg|jpeg)$/i)) frontEndErrorsObj.image4 = "Image URL must end in .png, .jpg, or .jpeg";
    }

    // Front end errors check
    if (Object.keys(frontEndErrorsObj).length === 0) {
      const formData = { address, country, city, state, description, name, price, lat: 49, lng: 49 }

      if (formType === 'Create Spot') {

        const newSpot = await dispatch(createSpotThunk(formData));
        spot = newSpot;

        if (!spot.error && !spot.errors) {
          // format images for fetch
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
        history.push(`/spots/${spot.spot.id}`);
      };

    } else {
      // else if there are front end errors, set errors state to that and return form displaying front end errors
      setErrors(frontEndErrorsObj);
    }

  }

  return (
    <div className="create-spot-wrapper">
      <form className="create-spot-form" onSubmit={handleSubmit}>
        <h1>{formType === "Create Spot" ? "Create a new Spot" : "Update your spot"}</h1>

        <div id="create-location-section">
          <h3>Where's your place located?</h3>
          <p className="field-description">Guests will only get your exact address once they've booked a reservation.</p>

          <div id="location-fields">
            <div className="spot-field">
              <div className="field-label">
                <label htmlFor="country">Country</label>
                {errors.country ? <p className="errors">{errors.country}</p> : null}
              </div>

              <input
                id="country"
                type="text"
                placeholder="Country"
                onChange={e => setCountry(e.target.value)}
                value={country}
              />
            </div>
            <div className="spot-field">
              <div className="field-label">
                <label htmlFor="address">Street Address</label>
                {errors.address ? <p className="errors">{errors.address}</p> : null}
              </div>

              <input
                id="address"
                type="text"
                placeholder="Address"
                onChange={e => setAddress(e.target.value)}
                value={address}
              />
            </div>
            <div className="city-state-field">
              <div className="spot-field" id="city-field-container">
                <div className="field-label">
                  <label htmlFor="city">City</label>
                  {errors.city ? <p className="errors">{errors.city}</p> : null}
                </div>
                <div id="city-field">
                  <input
                    id="city"
                    type="text"
                    placeholder="City"
                    onChange={e => setCity(e.target.value)}
                    value={city}
                  />
                  <div className="comma">,</div>

                </div>

              </div>
              <div className="spot-field">
                <div className="field-label">
                  <label htmlFor="state">State</label>
                  {errors.state ? <p className="errors">{errors.state}</p> : null}
                </div>
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
        </div>


        <div id="create-description-section" className="spot-field lower-field">
          <h3>Describe your place to guests</h3>
          <p className="field-description">Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
          <textarea
            id="description"
            name="decription"
            placeholder="Please write at least 30 characters"
            onChange={e => setDescription(e.target.value)}
            value={description}
          />
          {errors.description ? <p className="errors">{errors.description}</p> : null}
        </div>

        <div id="create-title-section" className="spot-field lower-field">
          <h3>Create a title for your spot</h3>
          <p className="field-description">Catch guests' attention with a spot title that highlights what makes your place special.</p>
          <input
            id="title"
            type="text"
            placeholder="Name of your spot"
            onChange={e => setName(e.target.value)}
            value={name}
          />
          {errors.name ? <p className="errors">{errors.name}</p> : null}
        </div>

        <div id="create-price-section" className="spot-field lower-field">
          <h3>Set a base price for your spot</h3>
          <p className="field-description">Competitive pricing can help your listing stand out and rank higher in search results.</p>
          <div id="price-line">
            <span id="">$</span>
            <input
              id="price"
              type="number"
              placeholder="Price per night (USD)"
              onChange={e => setPrice(e.target.value)}
              value={price}
            />

          </div>

          <p className="errors">{errors.price}</p>
        </div>
        {formType === "Create Spot" ?
          <div id="create-photos" className="spot-field">
            <h3>Liven up your spot with photos</h3>
            <p className="field-description">Submit a link to at least one photo to publish your spot. (Preview required.)</p>


            <div className="create-photos-field spot-field">

              <input
                id="preview"
                type="text"
                placeholder="Preview Image URL"
                onChange={e => setPreview(e.target.value)}
                value={preview}
              />
              {errors.preview ? <p className="errors">{errors.preview}</p> : null}
              <input
                id="image-1"
                type="text"
                placeholder="Image URL"
                onChange={e => setImage1(e.target.value)}
                value={image1}
              />
              {errors.image1 ? <p className="errors">{errors.image1}</p> : null}
              <input
                id="image-2"
                type="text"
                placeholder="Image URL"
                onChange={e => setImage2(e.target.value)}
                value={image2}
              />
              {errors.image2 ? <p className="errors">{errors.image2}</p> : null}
              <input
                id="image-3"
                type="text"
                placeholder="Image URL"
                onChange={e => setImage3(e.target.value)}
                value={image3}
              />
              {errors.image3 ? <p className="errors">{errors.image3}</p> : null}
              <input
                id="image-4"
                type="text"
                placeholder="Image URL"
                onChange={e => setImage4(e.target.value)}
                value={image4}
              />
              {errors.image4 ? <p className="errors" id="img-err-4">{errors.image4}</p> : null}
            </div>
          </div>
          : null}

        <div id="submit-container">
          <button
            id="submit-button"
            type="submit"
            disabled={formType === "Create Spot" ? (!country && !address && !city && !state && !description && !name && !price) || !preview : !country && !address && !city && !state && !description && !name && !price}
          >{formType}
          </button>
        </div>

      </form>
    </div >
  )
}

export default SpotForm;
