// Server
const express = require('express');

// Auth
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

// Validation
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


//==Middleware==//

// Check if signup info is valid
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];


// Sign up new user
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { email, password, username } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    // Creating new user in the database with the credentials and hashed password
    const user = await User.create({ email, username, hashedPassword });

    // Storing non-sensitive info in object to pass later with token
    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    // Sets token with new user object
    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser
    });
  }
);


module.exports = router;
