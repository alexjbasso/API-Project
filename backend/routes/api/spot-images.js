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
const spotImgCheck = async (req, res, next) => {
  let image = await SpotImage.findByPk(req.params.imageId, {
    include: { model: Spot }
  });

  if (!image) {
    return res.status(404).json({ message: ('Spot Image couldn\'t be found') })
  }
  req.image = image.toJSON()
  next();
};

// Delete a spot image
router.delete('/:imageId', requireLogIn, spotImgCheck, async (req, res) => {

  if (req.image.Spot.ownerId !== req.user.id) {
    res.status(403)
    return res.json({ message: "Forbidden" })
  }

  let image = await SpotImage.findByPk(req.params.imageId)

  await image.destroy();


  res.json({ message: "Successfully deleted" })


})



module.exports = router;
