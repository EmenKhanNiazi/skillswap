const express = require('express');
const router = express.Router();
const User = require('../models/user');  // Make sure to adjust the path if necessary

// Route to fetch user details along with their associated skills
router.get('/', async (req, res) => {
    try {
      // If no ID is provided, return all users
      const users = await User.find().populate('skills');
      if (users.length === 0) {
        return res.status(404).json({ msg: 'No users found' });
      }
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Server error');
    }
  });

module.exports = router;
