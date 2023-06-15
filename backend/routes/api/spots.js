// Server
const express = require('express');
const { Op } = require("sequelize");

// Validation
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// Authorization
const { restoreUser, requireAuth, requireLogIn } = require("../../utils/auth");

// Router
const router = express.Router();

// Imports
const { Spot, User, Review, SpotImage, ReviewImage, Booking, Sequelize } = require('../../db/models');
const booking = require('../../db/models/booking');

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

const validateBooking = async (startDate, endDate, req) => {

  const start = (new Date(((new Date(startDate)).toDateString()))).getTime()
  const end = (new Date(((new Date(endDate)).toDateString()))).getTime()

  let error = {}
  if (!startDate) error.startDate = "Start date is required"
  if (isNaN(start)) error.startDate = "Start date must be valid date";
  if (!endDate) error.endDate = "End date is required"
  if (isNaN(end)) error.endDate = "End date must be valid date";
  if (endDate <= startDate) error.endDate = "endDate cannot be on or before startDate"

  const bookings = await Booking.findAll({
    where: {
      spotId: parseInt(req.spot.id)
    }
  });

  const bookingsList = [];
  bookings.forEach(booking => {
    bookingsList.push(booking.toJSON());
  })

  bookingsList.forEach(booking => {
    const currentStart = (new Date(((new Date(booking.startDate)).toDateString()))).getTime()
    const currentEnd = (new Date(((new Date(booking.endDate)).toDateString()))).getTime()
    if (start >= currentStart && start <= currentEnd) {
      error.startDate = 'Start date conflicts with an existing booking'
    }
    if (end >= currentStart && end <= currentEnd) {
      error.endDate = 'End date conflicts with an existing booking'
    }
  })

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

// Test route
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

// Get all bookings for a spot
router.get('/:spotId/bookings', requireLogIn, spotCheck, async (req, res) => {

  const spot = await Spot.findByPk(req.params.spotId);
  const ownerId = spot.toJSON().ownerId;

  const bookings = await Booking.findAll({
    include: {
      model: User,
      attributes: ['id', 'firstName', 'lastName']
    },
    where: {
      spotId: req.params.spotId
    }
  })

  const bookingsList = [];
  bookings.forEach(booking => {
    booking = booking.toJSON();
    bookingsList.push(booking);
  });

  const resBookings = [];

  if (req.user.id === ownerId) {

    bookingsList.forEach(booking => {

      const resObj = {
        spotId: req.params.spotId,
        startDate: booking.startDate,
        endDate: booking.endDate
      }
      resBookings.push(resObj)
    })
  } else {

    bookingsList.forEach(booking => {

      const resObj = {
        User: {
          id: booking.User.id,
          firstName: booking.User.firstName,
          lastName: booking.User.lastName
        },
        id: booking.id,
        spotId: spot.id,
        userId: booking.userId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt
      }

      resBookings.push(resObj)
    })
  }

  return res.json({ Bookings: resBookings })

})

// Create a booking for a spot
router.post('/:spotId/bookings', requireLogIn, spotCheck, async (req, res) => {

  // Forbids you booking your own spot
  if (req.spot.ownerId === req.user.id) {
    res.status(403)
    return res.json("Cannot book your own spot")
  }

  const { startDate, endDate } = req.body;

  let error = await validateBooking(startDate, endDate, req)
  if (error) {
    res.status(400)
    return res.json({ message: "Bad Request", error: error })
  }

  const newBooking = await Booking.create({
    spotId: parseInt(req.params.spotId),
    userId: req.user.id,
    startDate,
    endDate
  })

  return res.json(newBooking)

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

  // Query filters
  let { page, size, maxLat, minLat, minLng, maxLng, minPrice, maxPrice } = req.query;

  page = parseInt(page);
  size = parseInt(size);

  // check errors
  let queryErrors = {};
  if (page && (page < 1 || page > 10)) queryErrors.page = 'Page must be between 1 and 10';
  if (size && (size < 1 || size > 20)) queryErrors.size = 'Size must be between 1 and 10';
  if (maxLat && (maxLat < -90 || maxLat > 90)) queryErrors.maxLat = 'Maximum latitude is invalid';
  if (minLat && (minLat < -90 || minLat > 90)) queryErrors.minLat = 'Minimum latitude is invalid';
  if (minLng && (minLng < -180 || minLng > 180)) queryErrors.minLng = 'Minimum longitude is invalid';
  if (maxLng && (maxLng < -180 || maxLng > 180)) queryErrors.maxLng = 'Maximum longitude is invalid';
  if (minPrice && (minPrice < 0)) queryErrors.minPrice = 'Minimum price must be greater than or equal to 0';
  if (maxPrice && (maxPrice < 0)) queryErrors.maxPrice = 'Maximum price must be greater than or equal to 0';

    if (Object.keys(queryErrors).length > 0) {
      res.status(400)
      const message = queryErrors.message ? queryErrors.message : "Bad Request";
      delete queryErrors.message;
      return res.json({ message, error: queryErrors })
    }

  // Handle filters
  if (!page) {
    page = 1;
  }

  if (!size) {
    size = 20;
  }

  let pagination = {};

  if (page >= 1 && size >= 1) {
    pagination.limit = size;
    pagination.offset = (page - 1) * size;
  }

  where = {};
  if (!maxLat) maxLat = 90;
  if (!minLat) minLat = -90;
  if (!minLng) minLng = -180;
  if (!maxLng) maxLng = 180;
  if (!minPrice) minPrice = 0;
  if (!maxPrice) maxPrice = 9999999;

  where.lat = {
    [Op.between]: [minLat, maxLat],
  };
  where.lng = {
    [Op.between]: [minLat, maxLat]
  }
  where.price = {
    [Op.between]: [minPrice, maxPrice]
  }



  // Query

  const spots = await Spot.findAll({
    ...pagination,
    include: [
      { model: Review },
      { model: SpotImage }
    ],
    where
  });

  if (spots.length === 0) {
    return res.json("No results found")
  }

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
    Spots: updatedSpots,
    page,
    size
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
