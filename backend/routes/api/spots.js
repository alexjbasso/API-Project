// Server
const express = require('express');

// Validation
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// Authorization
const { restoreUser, requireAuth, requireLogIn } = require("../../utils/auth");


const router = express.Router();

// Imports
const { Spot, User, Review, SpotImage, ReviewImage, Sequelize } = require('../../db/models');

// Middleware
const validateSpot = (address, city, state, country, lat, lng, name, description, price) => {

  let error = {}
  if (!address) error.address = "Street address is required"
  if (!city) error.city = "City is required"
  if (!state) error.state = "State is required"
  if (!country) error.country = "Country is required"
  if (Number.isNaN(lat)) error.lat = "Latitude is not valid"
  if (Number.isNaN(lng)) error.lng = "Longitude is not valid"
  if (!name) error.name = "Name is required"
  if (name && name.length > 50) error.name = "Name must be less than 50 characters"
  if (!description) error.description = "Price per day is required"
  if (!price) error.price = "Price per day is required"

  if (Object.keys(error).length > 0) {
    return error
  }
}

const validateReview = (review, stars) => {

  let error = {}
  if (!review) error.review = "Review text is required"
  if (!stars || stars > 5 || stars < 1) error.stars = "Stars must be an integer from 1 to 5"

  if (Object.keys(error).length > 0) {
    return error
  }
}

const findAvgRating = (spot) => {
  let total = 0;
  const ratings = spot.Reviews.map((review) => {
    total += review.stars;
  })
  let avgStarRating = ratings.length > 0 ? total / ratings.length : null;

  return { average: avgStarRating, count: ratings.length }
}

const canEdit = async (req, res, next) => {

  let spot = await Spot.findByPk(req.params.spotId);

  if (spot.ownerId !== req.user.id) {
    return res.status(403).json({ message: ('Forbidden') })
  }
  next();
}

const spotCheck = async (req, res, next) => {
  let spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    return res.status(404).json({ message: ('Spot couldn\'t be found') })
  }
  req.spot = spot
  next();
}

const revAuthBySpot = async (req, res, next) => {

  const valReview = await Review.findAll({
    include: [{
      model: Spot,
      where: {
        id: req.spot.id
      }
    },
    {
      model: User,
      where: {
        id: req.user.id
      }
    }]
  })
  
  if (valReview.length) {
    res.status(500)
    return res.json({ message: "User already has a review for this spot" })
  }
  next();
}

router.get('/test', async (req, res) => {

  const spots = await Spot.findAll({
    include: [
      { model: Review },
      {
        model: SpotImage,
        where: {
          preview: true
        }
      }
    ]
  });

  return res.json(spots)

})


// Get current users's spots
router.get('/current', requireLogIn, async (req, res) => {
  const spots = await req.user.getSpots({
    include: [
      { model: Review },
      {
        model: SpotImage
      }
    ]
  });

  let updatedSpots = [];

  for (let spot of spots) {
    // avg rating
    const { average } = findAvgRating(spot);

    // set the url 
    let url;
    for (let image of spot.SpotImages) {
      if (image.preview === true) {
        url = image.url;
        // break
      }
    }


    //build new spot(s) for res

    const updatedSpot = {
      ...spot.dataValues,
      avgRating: average,
      preview: url,
    };
    delete updatedSpot.SpotImages;
    delete updatedSpot.Reviews;

    updatedSpots.push(updatedSpot);
  }

  return res.json({
    Spots: [...updatedSpots]
  })

})

// Create a new image for a spot
router.post('/:spotId/images', requireLogIn, spotCheck, canEdit, async (req, res) => {
  const { url, preview } = req.body;

  const spot = req.spot;

  const newSpotImage = await SpotImage.create({
    spotId: spot.id, url, preview: preview === true ? true : false
  })

  res.json({
    url: newSpotImage.url,
    preview: newSpotImage.preview
  })

})

//Get all reviews for a spot
router.get('/:spotId/reviews', spotCheck, async (req, res) => {

  let reviews = await req.spot.getReviews({
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url']
      }
    ]
  });

  res.json({ Reviews: [...reviews] })
})

// Create a new review for a spot
router.post('/:spotId/reviews', requireLogIn, spotCheck, revAuthBySpot, async (req, res) => {

  const { review, stars } = req.body;

  let error = validateReview(review, stars)
  if (error) {
    res.status(400)
    return res.json({ message: "Bad Request", error: error })
  }

  const newReview = await Review.create({
    userId: req.user.id,
    spotId: req.spot.id,
    review,
    stars
  })

  return res.json(newReview)

})

// Get spot details
router.get('/:spotId', spotCheck, async (req, res) => {

  let spot = await Spot.findByPk(req.params.spotId, {
    include: [
      { model: SpotImage, attributes: ['id', 'url', 'preview'] },
      { model: User, attributes: ['id', 'firstName', 'lastName'] },
      { model: Review }
    ]
  })



  const { average, count } = findAvgRating(spot);

  return res.json({
    id: spot.id,
    ownerId: spot.ownerId,
    addres: spot.addres,
    city: spot.city,
    country: spot.country,
    lat: spot.lat,
    lng: spot.lng,
    name: spot.name,
    description: spot.description,
    price: spot.price,
    createdAt: spot.createdAt,
    updatedAt: spot.updatedAt,
    numReviews: count,
    avgStarRating: average,
    SpotImages: spot.SpotImages,
    Owner: spot.User
  })

})

// Edit spot details
router.put('/:spotId', requireLogIn, spotCheck, canEdit, async (req, res) => {

  const { address, city, state, country, lat, lng, name, description, price } = req.body

  let error = validateSpot(address, city, state, country, lat, lng, name, description, price)
  if (error) {
    res.status(400)
    return res.json({ message: "Bad Request", error: error })
  }

  let spot = req.spot;

  if (address) {
    spot.address = address;
  }
  if (city) {
    spot.city = city;
  }
  if (state) {
    spot.state = state;
  }
  if (country) {
    spot.country = country;
  }
  if (lat) {
    spot.lat = lat;
  }
  if (lng) {
  } spot.lng = lng;
  if (name) {
    spot.name = name;
  }
  if (description) {
    spot.description = description;
  }
  if (price) {
    spot.price = price;
  }

  await spot.save();

  res.json(spot)

})

// Delete a spot
router.delete('/:spotId', requireLogIn, spotCheck, canEdit, async (req, res) => {
  const spot = req.spot;
  await spot.destroy();
  return res.json({ message: "Successfully deleted" })
})

// Get all spots
router.get('/', async (req, res) => {

  const spots = await Spot.findAll({
    include: [
      { model: Review },
      { model: SpotImage }
    ]
  });

  let updatedSpots = [];

  for (let spot of spots) {
    // avg rating
    const { average } = findAvgRating(spot);

    // set the url 
    let url;
    for (let image of spot.SpotImages) {
      if (image.preview === true) {
        url = image.url;
        // break
      }
    }

    //build new spot(s) for res
    const updatedSpot = {
      ...spot.dataValues,
      avgRating: average,
      preview: url,
    };
    delete updatedSpot.SpotImages;
    delete updatedSpot.Reviews;

    updatedSpots.push(updatedSpot);
  }

  return res.json({
    Spots: updatedSpots
  })
}
)

// Create a new spot
router.post('/', requireLogIn, async (req, res) => {

  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  let error = validateSpot(address, city, state, country, lat, lng, name, description, price)
  if (error) {
    res.status(400)
    return res.json({ message: "Bad Request", error: error })
  }

  const newSpot = await Spot.create({
    ownerId: req.user.id, address, city, state, country, lat, lng, name, description, price
  });

  return res.json(newSpot);

})




module.exports = router;
