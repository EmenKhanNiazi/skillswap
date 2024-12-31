const express = require("express");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const cookieParser = require("cookie-parser");
const userModel = require("../models/user");
const requestschema = require("../models/requestschema");

const router = Router();
const jwtSecret = process.env.JWT_SECRET || "shhhhh";

router.use(cookieParser());

router.post("/", async (req, res) => {
    try {
        console.log("Request received:", req.body);

        const token = req.cookies.token;
        if (!token) {
            return res.status(401).send("Unauthorized");
        }

        const decoded = jwt.verify(token, jwtSecret);
        const user = await userModel.findOne({ email: decoded.email });
        if (!user) {
            return res.status(404).send("User not found");
        }

        const { requester, serviceProvider, skill, message, status, timecreated } = req.body;

        if (!requester || !serviceProvider || !skill || !status || !timecreated) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Ensure the skill is either an ObjectId or a string
        if (typeof skill === 'string' && skill.length === 0) {
            return res.status(400).json({ message: "Invalid skill" });
        }

        const requesterUser = await userModel.findById(requester);
        const serviceProviderUser = await userModel.findById(serviceProvider);

        if (!requesterUser || !serviceProviderUser) {
            return res.status(400).json({ message: "Invalid requester or service provider." });
        }

        const createdRequest = new requestschema({
            requester,
            serviceProvider,
            skill,  // Ensure skill is passed correctly (either as string or ObjectId)
            message,
            status,
            timecreated
        });

        await createdRequest.save();

        serviceProviderUser.requests = serviceProviderUser.requests || [];
        serviceProviderUser.requests.push(createdRequest._id);
        await serviceProviderUser.save();

        res.status(200).send(createdRequest);
    } catch (error) {
        console.error("Error creating request:", error);
        res.status(500).json({ message: "Error creating request", error });
    }
});

module.exports = router;





// const express=require("express");
// const app=express();
// const jwt=require('jsonwebtoken');
// const {Router}= require("express");
// const router=Router();
// const userModel=require('../models/user');
// const requestschema = require("../models/requestschema");
// router.post('/',async(req,res)=>{
//     const token=req.cookies.token;
//     if(!token) res.status(401).send("unauthorized")
//     const decoded=jwt.verify(token,'shhhhh');
//     const user=await userModel.findOne({email: decoded.email});
//     if(!user) res.status(404).send("user not found");
    

// //user k requests wale page p uski requests post
//     const {requester,serviceprovider,skill,message,status,timecreated }=req.body;
//     // Find the requester and service provider users
//     const requesterUser = await userModel.findById(requester);
//     const serviceProviderUser = await userModel.findById(serviceprovider);

//     if (!requesterUser || !serviceProviderUser) {
//         return res.status(400).json({ message: "Requester or Service Provider are required." });
//     }

//     const createdrequest=new requestschema({
//     requester,
//     serviceprovider,
//     skill,
//     message,
//     status,
//     timecreated,
//     serviceProviderUser: userId, // Link the request to the user
//     });
//     await createdrequest.save();
//     serviceProviderUser.requests = serviceProviderUser.requests || []; // Ensure requests array exists
//     serviceProviderUser.requests.push(createdrequest._id);
//     await serviceProviderUser.save();
//     res.status(200).send(createdrequest);
// })

// router.get('/',async(req,res)=>{
//     const token=req.cookies.token;
//         if (!token) return res.status(401).send("Unauthorized");
//     try {
//         const decodeduser=jwt.verify(token,'shhhhh');
//         const currentuser=await userModel.findOne({email: decoded.email});
//         // const currentuser=await userModel.findOne({id: decodeduser.id});
//         if (!currentuser) {
//             return res.status(404).json({ message: "User not found." });
//         }
//         // const currentuser=await user.findOne({email:decodeduser});
//         //if we dont filter our sesrch
//         const userId=currentuser._id;
//         const requests = await requestschema.find({
//             requester: userId // Fetch requests where the logged-in user is the requester
//         }).populate('skill') // Optionally populate skill details
//         .populate('serviceprovider'); // Optionally populate service provider details;

//         if (!requests || requests.length === 0) {  // Check if no requests were found
//             return res.status(404).json({ message: "No requests found." });
//         }
//         res.status(200).json(requests);  // Send the requests as a response
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching requests", error });
//     }
// })
// module.exports=router;



// router.get('/',async(req,res)=>{
//     const token=req.cookies.token;
//         if (!token) return res.status(401).send("Unauthorized");
//     try {
//         const decodeduser=jwt.verify(token,'shhhhh');
//         const currentuser=await userModel.findOne({id: decodeduser.id});
//         if (!currentuser) {
//             return res.status(404).json({ message: "User not found." });
//         }
//         // const currentuser=await user.findOne({email:decodeduser});
//         //if we dont filter our sesrch
//         const requests = await requestschema.find({
//             $or: [
//                 { requester: currentuser._id },  // Requests made by the user
//                 { serviceprovider: currentuser._id }  // Requests made to the user
//             ]
//         }).populate('requester serviceprovider skill'); // Optionally populate references for more details

//         if (!requests || requests.length === 0) {  // Check if no requests were found
//             return res.status(404).json({ message: "No requests found." });
//         }
//         res.status(200).json(requests);  // Send the requests as a response
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching requests", error });
//     }
// })




// const express=require("express");
// const app=express();
// const jwt=require('jsonwebtoken');
// const {Router}= require("express");
// const router=Router();
// const userModel=require('../models/user');
// const requestschema = require("../models/requestschema");
// router.post('/',async(req,res)=>{
//     const token=req.cookies.token;
//     if(!token) res.status(401).send("unauthorized")
//     const decoded=jwt.verify(token,'shhhhh');
//     const user=await userModel.findOne({email: decoded.email});
//     if(!user) res.status(404).send("user not found");
    

// //user k requests wale page p uski requests post
//     const {requester,serviceprovider,skill,message,status,timecreated }=req.body;
//     // Find the requester and service provider users
//     const requesterUser = await userModel.findById(requester);
//     const serviceProviderUser = await userModel.findById(serviceprovider);

//     if (!requesterUser || !serviceProviderUser) {
//         return res.status(400).json({ message: "Requester or Service Provider are required." });
//     }

//     const createdrequest=new requestschema({
//     requester,
//     serviceprovider,
//     skill,
//     message,
//     status,
//     timecreated,
//     serviceProviderUser: userId, // Link the request to the user
//     });
//     await createdrequest.save();
//     serviceProviderUser.requests = serviceProviderUser.requests || []; // Ensure requests array exists
//     serviceProviderUser.requests.push(createdrequest._id);
//     await serviceProviderUser.save();
//     res.status(200).send(createdrequest);
// })

// router.get('/',async(req,res)=>{
//     const token=req.cookies.token;
//         if (!token) return res.status(401).send("Unauthorized");
//     try {
//         const decodeduser=jwt.verify(token,'shhhhh');
//         const currentuser=await userModel.findOne({email: decoded.email});
//         // const currentuser=await userModel.findOne({id: decodeduser.id});
//         if (!currentuser) {
//             return res.status(404).json({ message: "User not found." });
//         }
//         // const currentuser=await user.findOne({email:decodeduser});
//         //if we dont filter our sesrch
//         const userId=currentuser._id;
//         const requests = await requestschema.find({
//             requester: userId // Fetch requests where the logged-in user is the requester
//         }).populate('skill') // Optionally populate skill details
//         .populate('serviceprovider'); // Optionally populate service provider details;

//         if (!requests || requests.length === 0) {  // Check if no requests were found
//             return res.status(404).json({ message: "No requests found." });
//         }
//         res.status(200).json(requests);  // Send the requests as a response
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching requests", error });
//     }
// })
// module.exports=router;



// router.get('/',async(req,res)=>{
//     const token=req.cookies.token;
//         if (!token) return res.status(401).send("Unauthorized");
//     try {
//         const decodeduser=jwt.verify(token,'shhhhh');
//         const currentuser=await userModel.findOne({id: decodeduser.id});
//         if (!currentuser) {
//             return res.status(404).json({ message: "User not found." });
//         }
//         // const currentuser=await user.findOne({email:decodeduser});
//         //if we dont filter our sesrch
//         const requests = await requestschema.find({
//             $or: [
//                 { requester: currentuser._id },  // Requests made by the user
//                 { serviceprovider: currentuser._id }  // Requests made to the user
//             ]
//         }).populate('requester serviceprovider skill'); // Optionally populate references for more details

//         if (!requests || requests.length === 0) {  // Check if no requests were found
//             return res.status(404).json({ message: "No requests found." });
//         }
//         res.status(200).json(requests);  // Send the requests as a response
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching requests", error });
//     }
// })



//correect 
// const express = require("express");
// const jwt = require("jsonwebtoken");
// const { Router } = require("express");
// const cookieParser = require("cookie-parser");
// const userModel = require("../models/user");
// const requestschema = require("../models/requestschema");

// const router = Router();
// const jwtSecret = process.env.JWT_SECRET || "shhhhh";

// router.use(cookieParser());

// // POST request to create a new request
// router.post("/", async (req, res) => {
//     try {
//         const token = req.cookies.token;
//         if (!token) return res.status(401).send("Unauthorized");

//         const decoded = jwt.verify(token, jwtSecret);
//         const user = await userModel.findOne({ email: decoded.email });
//         if (!user) return res.status(404).send("User not found");

//         const { requester, serviceprovider, skill, message, status, timecreated } = req.body;

//         // Validate input
//         if (!requester || !serviceprovider || !skill || !status || !timecreated) {
//             return res.status(400).json({ message: "All fields are required." });
//         }

//         // Check requester and service provider users
//         const requesterUser = await userModel.findById(requester);
//         const serviceProviderUser = await userModel.findById(serviceprovider);

//         if (!requesterUser || !serviceProviderUser) {
//             return res.status(400).json({ message: "Invalid requester or service provider." });
//         }

//         const createdRequest = new requestschema({
//             requester,
//             serviceprovider,
//             skill,
//             message,
//             status,
//             timecreated
//         });

//         await createdRequest.save();

//         serviceProviderUser.requests = serviceProviderUser.requests || [];
//         serviceProviderUser.requests.push(createdRequest._id);
//         await serviceProviderUser.save();

//         res.status(200).send(createdRequest);
//     } catch (error) {
//         res.status(500).json({ message: "Error creating request", error });
//     }
// });

// // GET request to fetch user's requests
// router.get("/", async (req, res) => {
//     try {
//         const token = req.cookies.token;
//         if (!token) return res.status(401).send("Unauthorized");

//         const decodeduser = jwt.verify(token, jwtSecret);
//         const currentuser = await userModel.findOne({ email: decodeduser.email });

//         if (!currentuser) {
//             return res.status(404).json({ message: "User not found." });
//         }

//         const requests = await requestschema.find({
//             requester: currentuser._id
//         }).populate("skill").populate("serviceprovider");

//         if (!requests || requests.length === 0) {
//             return res.status(404).json({ message: "No requests found." });
//         }

//         res.status(200).json(requests);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching requests", error });
//     }
// });

// module.exports = router;