
const express = require("express");
const userModel = require('../models/user'); // Import user model
const { Router } = require("express");
const jwt = require('jsonwebtoken');
const router = Router();


// Route to fetch user details based on the user ID
// router.get('/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id).populate('skills');
//     if (!user) {
//       return res.status(404).json({ msg: 'User not found' });
//     }
//     res.json(user); // Send the user data
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     res.status(500).send('Server error');
//   }
// });

router.get('/', async (req, res) => {
    const token = req.cookies.token; // Get the token from cookies
    if (!token) return res.status(401).send("Unauthorized");
  
    try {
      const decoded = jwt.verify(token, 'shhhhh');
      const user = await userModel.findOne({ email: decoded.email });
      if (!user) return res.status(404).send("User not found");
  
      res.json({
        name: user.username,
        email: user.email,
        age: user.age,
        bio: user.bio,
        location: user.location,
      });
    } catch (err) {
      return res.status(400).send("Invalid token");
    }
  });
  
module.exports=router;
