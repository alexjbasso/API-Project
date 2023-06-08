const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// Gets session user
router.get(
  '/',
  (req, res) => {
    const { user } = req;
    if (user) {
      const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
      };
      return res.json({
        user: safeUser
      });
    } else return res.json({ user: null });
  }
);

// Logs in user
router.post(
  '/',
  async (req, res, next) => {
    // Get submitted username/email and password from request body
    const { credential, password } = req.body;

    //Find user in the database that matches credentials
    const user = await User.unscoped().findOne({
      where: {
        // either username or email
        [Op.or]: {
          username: credential,
          email: credential
        }
      }
    });

    // If the password submitted doesn't matched the stored hased password, throw a 401 error
    if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = { credential: 'The provided credentials were invalid.' };
      return next(err);
    }

    // If the password does match, then create a user object of the user logging in
    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    // Set token cookie with authorized user object
    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser
    });
  }
)



// Logs user out by deleting login token from cookies
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

module.exports = router
