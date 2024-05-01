var express = require('express');
var router = express.Router();


//handle game setup 
router.get('/', function(req, res, next) {
  const filePath = path.join(__dirname, "../public/index.html");
  res.sendFile(filePath);
});

module.exports = router;
