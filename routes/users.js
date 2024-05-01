var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  const filePath = path.join(__dirname, "../public/register.html");
  res.sendFile(filePath);
});

module.exports = router;
