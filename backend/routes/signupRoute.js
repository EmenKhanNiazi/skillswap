const express=require("express");
const app=express();
const {Router}=require("express");
const router=Router();
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const userModel=require('../models/user');
router.post('/', async (req, res) => {
    try {
      let { username, email, password, age, location, skills, bio } = req.body;
  
      // Convert skills from string to an array
      let skillsArray = skills ? skills.split(',').map((skill) => skill.trim()) : [];
  
      // Hash the password
      let hash = await bcrypt.hash(password, 10);
  
      // Create the user
      let createdUser = await userModel.create({
        username,
        email,
        age,
        password: hash, // Save the hashed password
        location,
        skills: skillsArray, // Save skills as an array of strings
        bio,
      });

      console.log('created user in db', createdUser);
  
      // Generate a JWT
      let token = jwt.sign({ email  , id: createdUser._id  }, 'shhhhh');
      res.cookie('token', token); // Send the token as a cookie
      console.log('User ID:', createdUser._id);
      res.status(201).send(createdUser); // Send the created user as a response
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while signing up.');
    }
  });

module.exports=router;