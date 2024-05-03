var express = require('express');
var router = express.Router();
var path = require('path');

const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");

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


router.post('/login', async function(req, res) {
  try{
    const {username,password} = req.body;
    
    if(!username || !password){
      return res.sendStatus(401);
    }
    
    const this_user = await User.findOne({username});
    if(!this_user){
      return res.sendStatus(401);
    }

    const isMatch = await bcrypt.compare(password,this_user.password);
    if(!isMatch){
      return res.sendStatus(401);
    }

    req.session.user_id = this_user._id;
    // res.sendStatus(200);
    const filePath = path.join(__dirname, "../public/home.html");
    res.sendFile(filePath);

  }catch(err){
      console.log(err);
      res.status(500).json({message:"server error"});
  }
});

router.post('/register', async function(req, res) {
  try{
    const {username,password,email} = req.body;
    
    if(!username || !password || !email){
      return res.status(401).send({message:"Insert your credintials"});
    }
    
    const this_user = await User.findOne({username});
    if(this_user){
      return res.status(409).json({
        message:"Username already taken"
      });
    }

    const hashedPass = await bcrypt.hash(password,10);
    const newUser = new User({
      username,
      password: hashedPass,
      email
    });

    const user = await newUser.save();

    req.session.user_id = user._id;

    // res.sendStatus(201);
    const filePath = path.join(__dirname, "../public/home.html");
    res.sendFile(filePath);

  }catch(err){
      console.log(err);
      res.status(500).json({message:"server error"});
  }
});

router.get('/forgot', function(req, res, next) {
  const filePath = path.join(__dirname, "../public/forgot.html");
  res.sendFile(filePath);
});

//renaming allowed
router.get('/change-password', function(req, res, next) {
  const filePath = path.join(__dirname, "../public/change_pass.html");
  res.sendFile(filePath);
});
module.exports = router;
