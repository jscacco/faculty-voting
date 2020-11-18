var express = require('express');
var router = express.Router();

router.get('/BOOM', function(req, res, next) {
  res.send("BOOM!");
});

module.exports = router;
