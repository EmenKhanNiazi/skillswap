const express = require("express");
const User = require("./models/User"); // Your User model
const router = express.Router();

router.get("/api/requests/sent/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by ID
    const user = await User.findById(userId).populate("sentRequests"); // Populate `sentRequests` if it's referencing another schema

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(user.sentRequests); // Send back the user's sentRequests
  } catch (error) {
    console.error("Error fetching sent requests:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
