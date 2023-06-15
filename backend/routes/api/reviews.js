// Server
const express = require('express');

// Validation
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// Authorization
const { restoreUser, requireAuth, requireLogIn } = require("../../utils/auth");

// Imports
const { Spot, User, Review, SpotImage, ReviewImage, Sequelize } = require('../../db/models');

const router = express.Router();

// Middleware
const revCheck = async (req, res, next) => {
  let review = await Review.findByPk(req.params.reviewId);

  if (!review) {
    return res.status(404).json({ message: ('Review couldn\'t be found') })
  }

  req.review = review
  next();
};

const validateReview = (review, stars) => {

  let error = {}
  if (!review) error.review = "Review text is required"
  if (!stars || stars > 5 || stars < 1) error.stars = "Stars must be an integer from 1 to 5"

  if (Object.keys(error).length > 0) {
    return error
  }
};

const canEditRev = async (req, res, next) => {

  let review = await Review.findByPk(req.params.reviewId)

  if (review.userId !== req.user.id) {
    res.status(403)
    return res.json({ message: "Forbidden" })
  }
  next();
};

// Get reviews of current user
router.get('/current', requireLogIn, async (req, res) => {

  let reviews = await req.user.getReviews({
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: Spot,
        attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
        include: {
          model: SpotImage,
        }
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url']
      }
    ]
  });

  let reviewsList = []
  reviews.forEach(review => {
    reviewsList.push(review.toJSON())
  })

  reviewsList.forEach(review => {
    let spotImages = review.Spot.SpotImages
    spotImages.forEach(image => {
      if (image.preview === true) {
        review.Spot.previewImage = image.url
      }
    })
    delete review.Spot.SpotImages
  })

  let response;
  if (!reviewsList.length) {
    response = 'You have no reviews!'
  } else {
    response = { Reviews: reviewsList }
  }

  res.json(response)

});

// Add image to a review
router.post('/:reviewId/images', requireLogIn, revCheck, canEditRev, async (req, res) => {

  const { url } = req.body;

  const errors = {};
  if (!url) errors.url = 'Must include URL';

  // Check if at image capacity
  const reviewFull = await Review.findByPk(req.params.reviewId, {
    include: {
      model: ReviewImage
    }
  });

  const reviewObj = reviewFull.toJSON();
  const imgCount = reviewObj.ReviewImages.length;

  if (imgCount >= 10) errors.url = 'Maximum number of images for this resource was reached';

  if (Object.keys(errors).length > 0) {
    res.status(403);
    return res.json({ message: "Bad Request", errors })
  }

  // Build new image

  const newReviewImage = await ReviewImage.create({
    reviewId: req.review.id,
    url
  })

  return res.json({ id: newReviewImage.id, url })

});

// Edit a review
router.put('/:reviewId', requireLogIn, revCheck, canEditRev, async (req, res) => {
  const { review, stars } = req.body

  let error = validateReview(review, stars)
  if (error) {
    res.status(400)
    return res.json({ message: "Bad Request", error: error })
  }

  const currRev = req.review

  currRev.review = review
  currRev.stars = stars

  await currRev.save();

  res.json(currRev)

});

// Delete a review
router.delete('/:reviewId', requireLogIn, revCheck, canEditRev, async (req, res) => {
  await req.review.destroy();
  return res.json({ message: "Successfully deleted" })
});

module.exports = router;
