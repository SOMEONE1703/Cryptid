var express = require('express');
var router = express.Router();
var path = require('path');

const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");

//handle all user stuff
router.get("/",(req,res)=>{
  if(req.session.user_id){
    const filePath = path.join(__dirname, "../public/home.html");
    res.sendFile(filePath);
  }
  else{
    const filePath = path.join(__dirname, "../public/login.html");
    res.sendFile(filePath);
  }
});

// login
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
    res.sendStatus(200)

  }catch(err){
      console.log(err);
      res.status(500).json({message:"server error"});
  }
});
// signUp
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

    res.sendStatus(201);

  }catch(err){
      console.log(err);
      res.status(500).json({message:"server error"});
  }
});

// forgotpass
router.get('/forgot', function(req, res, next) {
  const filePath = path.join(__dirname, "../public/forgot.html");
  res.sendFile(filePath);
});

router.post('/forgot',async(req,res)=>{
  try{
    const {email} = req.body;
    if(!email){
      return res.Code(400).json({
        message:"bad request"
      });
    }

    const available = await User.findOne({email});
    if(!available){
      return res.status(401).json({
        message:"No email address like that"
      });
    }
    //write code to send verification code
    //and add that code into Code document
    //Code.insert mapped to email & username

    let code = "magabaza1";//generateCode();

    // now code store in session
    const user_id = available._id;
    req.session.code_user_id = {
      user_id,
      code
    };
    
    res.status(200).json({
      message:"waiting for code"
    });
  }
  catch(err){
    console.log(err);
    res.status(500).json({message:"server error"});
  }
});


router.post('/forgot/code',async(req,res)=>{
  try{
    const {code} = req.body;
    if(!req.session.code_user_id){
      return res.status(401).json({
        message:"Unauthorized"
      });
    }
    if(req.session.code_user_id.code != code){
      return res.status(401).json({
        message:"Incorrect code"
      });
    }
    //correct verification code
    res.status(201).json({
      message:"correct code"
    });
  }
  catch(err){
    console.log(err);
    res.status(500).json({message:"server error"});
  }
});

// new password
router.patch('/updatepassword',async(req,res)=>{
  try{
    const {password} = req.body;
    if(!password){
      return res.sendStatus(400);
    }
    if(!req.session.id){
      return res.sendStatus(401);
    }

    const hashedPass = await bcrypt.hash(password,10);
    const updatedUser = await User.findByIdAndUpdate(
      req.session.code_user_id.user_id,
      {password:hashedPass},
      {new:true}
    );

    delete req.session.code_user_id;
    
    req.session.user_id = updatedUser._id;

    res.sendStatus(200);
  }
  catch(err){
    console.log(err);
    res.status(500).json({message:"server error"});
  }
});

//home
router.get('/home', function(req, res, next) {
  const filePath = path.join(__dirname, "../public/home.html");
  res.sendFile(filePath);
});

// /users/sendemail
router.get('/sendemail', function(req, res, next) {
  const filePath = path.join(__dirname, "../public/index.html");
  res.sendFile(filePath);
});
module.exports = router;
