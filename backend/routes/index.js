const express = require('express');
const router = express.Router();

router.get("/api/csrf/restore", (req, res) => {
  // Set cookie 'XSRF-TOKEN' on response to value of req.csrfToken()
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});

// Prefix all routes with /api
const apiRouter = require('./api');
router.use('/api', apiRouter);

module.exports = router;
