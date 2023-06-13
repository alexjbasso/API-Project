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

    let updatedSpots = [];
    let avgRating = 0;

    for (let spot of spots) {
      // avg rating
      let total = 0;
      const count = spot.Reviews.map((review) => {
        total += review.stars;
      })
      avgRating = count.length > 0 ? total / count.length : null;

      delete spot.Reviews

      const spots = await SpotImage.findAll({
        where: {
          spotId: spot.id,
          preview: true
        }
      })

      // set the url 
      const url = spot.SpotImages.length ? spot.SpotImages[0].url : null;


      //build new spot for res

      const updatedSpot = {
        ...spot.dataValues,
        avgRating,
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




module.exports = router;





router.get('/:spotId', async (req, res) => {
  let answer = [];
  let spot = await Spot.findByPk(req.params.spotId, {
    include: [
      { model: SpotImage },
      { model: User, as: 'Owner', attributes: ['id', 'firstName', 'lastName'] },
      { model: Review }
    ]
  })
  let total = 0;
  const count = spot.Reviews.map((review) => {
    total += review.stars;
  })
  let avgRating = count.length > 0 ? total / count.length : null;
})
