const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();


// Sign up new user
router.post(
  '/',
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
