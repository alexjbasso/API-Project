// Server
const express = require('express');

// Validation
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// Authorization
const { restoreUser, requireAuth, requireLogIn } = require("../../utils/auth");

const router = express.Router();

// Imports
const { Spot, User, Review, SpotImage, ReviewImage, Booking, Sequelize } = require('../../db/models');

// Middleware

const bookingCheck = async (req, res, next) => {
  let booking = await Booking.findByPk(req.params.bookingId);

  if (!booking) {
    return res.status(404).json({ message: ('Booking couldn\'t be found') })
  }

  if (booking.dataValues.userId !== req.user.id) {
    res.status(403);
    return res.json({message: "You do not have permission to edit this booking"})
  }

  req.booking = booking
  next();
}

const validateBooking = async (startDate, endDate, req) => {

  const bookings = await Booking.findAll({
    where: {
      spotId: parseInt(req.params.bookingId)
    }
  });

  const start = (new Date(((new Date(startDate)).toDateString()))).getTime()
  const end = (new Date(((new Date(endDate)).toDateString()))).getTime()

  let error = {}
  if (!startDate) error.startDate = "Start date is required"
  if (isNaN(start)) error.startDate = "Start date must be valid date";
  if (!endDate) error.endDate = "End date is required"
  if (endDate <= startDate) error.endDate = "End date cannot be on or before start date"
  if (isNaN(end)) error.endDate = "End date must be valid date";

  const bookingsList = [];
  bookings.forEach(booking => {
    bookingsList.push(booking.toJSON());
  })

  bookingsList.forEach(booking => {
    const currentStart = (new Date(((new Date(booking.startDate)).toDateString()))).getTime()
    const currentEnd = (new Date(((new Date(booking.endDate)).toDateString()))).getTime()
    if (start >= currentStart && start <= currentEnd) {
      error.startDate = 'Start date conflicts with an existing booking'
      error.message = 'Sorry, this spot is already booked for the specified date'
    }
    if (end >= currentStart && end <= currentEnd) {
      error.endDate = 'End date conflicts with an existing booking'
      error.message = 'Sorry, this spot is already booked for the specified date'
    }
  })

  if (Object.keys(error).length > 0) {
    return error
  }
}

// Get all bookings for current user
router.get('/current', requireLogIn, async (req, res) => {

  const bookings = await Booking.findAll({
    include: {
      model: Spot,
      include: {
        model: SpotImage,
        where: {
          preview: true
        }
      }
    },
    where: {
      userId: req.user.id
    },
  })


  let bookingsList = [];
  bookings.forEach(booking => {
    bookingsList.push(booking.toJSON())
  })

  let retBookings = [];
  bookingsList.forEach(booking => {

    let url;
    if (booking.Spot.SpotImages.length) {
      url = booking.Spot.SpotImages[0].url
    } else {
      url = 'No Preview Available';
    }

    const retBooking = {
      id: booking.id,
      spotId: booking.spotId,
      Spot: {
        id: booking.Spot.id,
        ownerId: booking.Spot.ownerId,
        address: booking.Spot.address,
        city: booking.Spot.city,
        state: booking.Spot.state,
        country: booking.Spot.country,
        lat: booking.Spot.lat,
        lng: booking.Spot.lng,
        name: booking.Spot.name,
        price: booking.Spot.price,
        previewImage: url
      },
      userId: req.user.id,
      startDate: booking.startDate,
      endDate: booking.endDate,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt
    }

    retBookings.push(retBooking)

  })


  // return res.json(bookingsList)
  return res.json({ Bookings: retBookings })
})

// Update a booking
router.put('/:bookingId', requireLogIn, bookingCheck, async (req, res) => {

  const booking = req.booking;
  const { startDate, endDate } = req.body;
  const currentDate = (new Date(((new Date()).toDateString()))).getTime()
  const bookingEnd = (new Date(((new Date(booking.dataValues.endDate)).toDateString()))).getTime()

  if (currentDate > bookingEnd) {
    res.status(403);
    return res.json({ message: "Past bookings cannot be modified" })
  }

  let error = await validateBooking(startDate, endDate, req)
  if (error) {
    res.status(400)
    const message = error.message ? error.message : "Bad Request";
    delete error.message;
    return res.json({ message, error: error })
  }

  booking.startDate = startDate;
  booking.endDate = endDate;

  await booking.save();

  res.json(booking)

})

// Delete a booking
router.delete('/:bookingId', requireLogIn, bookingCheck, async (req, res) => {

  const booking = req.booking;
  const currentDate = (new Date(((new Date()).toDateString()))).getTime();
  const bookingStart = (new Date(((new Date(booking.dataValues.startDate)).toDateString()))).getTime()
  const bookingEnd = (new Date(((new Date(booking.dataValues.endDate)).toDateString()))).getTime();

  if (bookingStart < currentDate && currentDate < bookingEnd) {
    res.status(403);
    return res.json({ message: "Bookings that have been started can't be deleted" });
  }

  booking.destroy();

  res.json({ message: "Successfully deleted" })
})


module.exports = router;
