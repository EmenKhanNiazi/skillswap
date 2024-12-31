const express = require("express");
const User = require("../models/user"); // Your User model
const router = express.Router();

router.post("/", async (req, res) => {
  const { requesterId, skill } = req.body;

  try {
    // Find the requester by ID
    const user = await User.findById(requesterId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Add the skill to the user's sentRequests array
    user.sentRequests = user.sentRequests || []; // Initialize if undefined
    user.sentRequests.push(skill);

    // Save the updated user
    await user.save();

    res.status(200).send("Swap request sent successfully");
  } catch (error) {
    console.error("Error processing swap request:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
