var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Post: ' + process.env.ENV);
});

module.exports = router;
