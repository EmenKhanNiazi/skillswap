const express = require("express");
const skillModel = require("../models/skillschema"); // Ensure this is correctly defined and imported
const User=require("../models/user");
const { Router } = require("express");
const jwt=require("jsonwebtoken");
const router = Router();

// POST route to add a new skill
router.post("/", async (req, res) => {
  //only authorized login users can add skills
  const token=req.cookies.token;
  if(!token) return res.status(401).send("Unauthorized, Signin First");
  
  try {
    const decoded=jwt.verify(token,'shhhhh');
    const user1=await User.findOne({email: decoded.email});
    if(!user1) return res.status(404).send("user not found");
    
    const { name, proficiencyLevel, description , userId} = req.body;

    if (!name || !proficiencyLevel|| !userId) {
      return res.status(400).send("Name and proficiency level are required.");
    }
    const user2 = await User.findById(userId);
    if (!user2) {
        return res.status(404).json({ message: "User not found." });
    }

    const createdSkill = await skillModel.create({
      name,
      proficiencyLevel,
      description,
      // time,
      user: userId, // Link the skill to the user
      
    });

    res.status(201).send(createdSkill);
  } catch (error) {
    console.error("Error creating skill:", error);
    res.status(500).send("An error occurred while adding the skill.");
  }
});

// GET route to fetch skills
router.get("/", async (req, res) => {
  try {
    const skills = await skillModel.find();
    res.status(200).send(skills);
  } catch (error) {
    console.error("Error fetching skills:", error);
    res.status(500).send("An error occurred while fetching skills.");
  }
});

module.exports = router;


// const express=require("express");
// app = express;
// const {Router}=require("express");
// const router=Router();

// router.post('/', async (req, res) => {
//     try {
//       const { name, proficiencyLevel, description } = req.body;
  
//       if (!name || !proficiencyLevel) {
//         return res.status(400).send("Name and proficiency level are required.");
//       }
  
//       const createdSkill = await skillModel.create({
//         name,
//         proficiencyLevel,
//         description,
//       });
  
//       res.status(201).send(createdSkill);
//     } catch (error) {
//       console.error("Error creating skill:", error);
//       res.status(500).send("An error occurred while adding the skill.");
//     }
//   });
// module.exports=router;
