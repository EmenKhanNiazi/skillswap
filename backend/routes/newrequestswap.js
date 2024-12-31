const express = require('express');
const jwt = require('jsonwebtoken');
const Swap = require('../models/swapschema');
const User = require('../models/user');
const Skill = require('../models/skillschema');
const router = express.Router();

// Middleware to verify the token and extract user ID
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log("Token received:", token);

  if (!token) return res.status(401).send('Unauthorized');
  
  try {
    const decoded = jwt.verify(token, 'shhhhh');
    console.log("Decoded Token:", decoded);
    req.userId = decoded.id; // Attach user ID to the request object
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).send('Unauthorized');
  }
};

// Swap request handling on the backend
router.post('/', async (req, res) => {
  try {
    const { skillId, userId, receiverId, message } = req.body;

    console.log("Request Body:", req.body);

    // Verify if the skill exists and belongs to the receiver
    const skill = await Skill.findById(skillId);
    if (!skill) {
      console.error("Skill not found");
      return res.status(404).send('Skill not found');
    }

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      console.error("Receiver not found");
      return res.status(404).send('Receiver not found');
    }

    // Save the swap request
    const swapRequest = new Swap({
      skillId,
      senderId: userId, // logged-in user who is sending the request
      receiverId,
      message,
    });

    await swapRequest.save();
    console.log("Swap request saved successfully:", swapRequest);
    res.status(201).send('Swap request sent successfully');
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send('An error occurred');
  }
});

  module.exports = router;

// Route to request a swap
// router.post('/request-swap', verifyToken, async (req, res) => {
//   try {
//     const { receiverId, skillId, message } = req.body;
//     const senderId = req.userId;

//     // Ensure skillId and receiverId are provided
//     if (!receiverId || !skillId || !message) {
//       return res.status(400).send('Receiver ID, Skill ID, and message are required');
//     }

//     // Ensure sender and receiver exist
//     const sender = await User.findById(senderId);
//     const receiver = await User.findById(receiverId);
//     if (!sender || !receiver) {
//       return res.status(404).send('Sender or receiver not found');
//     }

//     // Ensure the skill exists
//     const skill = await Skill.findById(skillId);
//     if (!skill) {
//       return res.status(404).send('Skill not found');
//     }

//     // Create a new swap request
//     const swapRequest = await Swap.create({
//       senderId,
//       receiverId,
//       skillId,
//       message,
//       status: 'pending' // Initial status is 'pending'
//     });

//     res.status(201).send(swapRequest);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('An error occurred while processing the swap request');
//   }
// });

