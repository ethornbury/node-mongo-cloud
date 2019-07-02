const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('made it here to the routes index.js');
  res.render('index.ejs');
});

module.exports = router;
