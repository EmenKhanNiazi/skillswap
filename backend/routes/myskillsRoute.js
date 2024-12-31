const express = require("express");
const skillModel = require("../models/skillschema"); // Ensure this is correctly defined and imported
const User=require("../models/user");
const { Router } = require("express");
const jwt=require("jsonwebtoken");
const router = Router();

//unauthorized 401
//user not found 404
// GET route to fetch my skills
router.get("/", async (req, res) => {
    const token=req.cookies.token;
    if(!token) return res.status(401).send("unauthorized");
    const decoded=jwt.verify(token,'shhhhh');
    const userfound=await User.findOne({email: decoded.email});
    if(!userfound) return res.status(404).send("User not found");
    
    try {
    const userId=userfound._id;   
    // const skills = await skillModel.compare(userid, skillModel.userId);
    // Fetch skills associated with the user ID
    const skills = await skillModel.find({ user: userId }); // Query the skills by user ID
    res.status(200).send(skills);
  } catch (error) {
    console.error("Error fetching skills:", error);
    res.status(500).send("An error occurred while fetching skills.");
  }
});

module.exports = router;
