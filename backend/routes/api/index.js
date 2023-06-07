const router = require('express').Router();


//===Route Handlers===//

router.post('/test', function(req, res) {
  res.json({ requestBody: req.body });
});

module.exports = router;
