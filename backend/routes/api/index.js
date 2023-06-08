const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');


//===Middleware===//

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
  router.use(restoreUser);



//===Route Handlers===//



module.exports = router;
