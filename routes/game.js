var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  const filePath = path.join(__dirname, "../public/game.html");
  res.sendFile(filePath);
});

module.exports = router;
