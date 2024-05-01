var express = require('express');
var router = express.Router();

//handle all user stuff
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  const filePath = path.join(__dirname, "../public/signup.html");
  res.sendFile(filePath);
});
router.get('/login', function(req, res, next) {
  const filePath = path.join(__dirname, "../public/login.html");
  res.sendFile(filePath);
});

router.get('/forgot', function(req, res, next) {
  const filePath = path.join(__dirname, "../public/forgot.html");
  res.sendFile(filePath);
});

//renaming allowed
router.get('/changepassword', function(req, res, next) {
  const filePath = path.join(__dirname, "../public/change_pass.html");
  res.sendFile(filePath);
});
module.exports = router;
