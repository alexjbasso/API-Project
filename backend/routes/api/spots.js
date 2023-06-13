// Server
const express = require('express');

// Validation
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Imports
const { Spot, Review, SpotImage, Sequelize } = require('../../db/models');

router.get(
  '/',
  async (req, res) => {
    const spots = await Spot.findAll();

    for (let spot of spots) {
      const reviews = await spot.getReviews();
      // get the sum of all reviews AND the count of all reviews, and divide to get avg

      const spotImages = await spot.getSpotImages();
      // for each spotImage, add the url to an array, where preview = true, then later add it to the response obj

    }



    return res.json(
      // Spots: {...spots, previewImage}
      spots
    )
  }
)






module.exports = router;
