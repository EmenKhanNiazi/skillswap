const express=require('express')
const app=express()
const userModel=require('../models/user'); //we have the user modal in usermodel that we created in the modals 
const bcrypt=require('bcrypt')

const jwt=require('jsonwebtoken');
const { Router }=require("express");
const router=Router();
const profileRouter=require("../routes/profileRoute");
router.use("/profile",profileRouter)
router.post('/', async (req,res)=>{
    
  let user=await userModel.findOne({email: req.body.email});//first you have to check if that email user exists
  
  console.log(user);
  if(!user)  //if email written is wrong then user mei kuch ni mileyga i.e null otherwise yahan koi data hoga
    {return(res.send("your email/password is incorrect"))}; //so it doesnt helps the hacker in identifying if the issue is in password or the email

  console.log("hi");
  //now user.password is the hashed password we saved and body.password is the password user is entering rightnow through form
  //so comparing both and if matched we allow login
  bcrypt.compare(req.body.password, user.password, function(err, result) {
    if(!result){
   
    console.log("passwords do not match")  
    return res.status(400).send('Your email/password is incorrect'); 
} else {
     console.log("password matched")
     
     let token=jwt.sign({email: user.email}, "shhhhh"); //after logging in jwt setup karna pareyga
     res.cookie("token",token);
     res.status(200).json({
      message: 'Login successful',
      userId: user._id,
      token: token,
    });
    //  res.send("you are logged in");
    // res.send("wow");


    //  res.redirect('/',profileRouter);
    // app.use('/',profileRouter)
    // res.redirect('http://localhost:5173/profile');
// router.post('/',profileRouter);

}
console.log(result);
});
});


module.exports = router; 

// const express=require('express')
// const app=express()
// const userModel=require('../models/user'); //we have the user modal in usermodel that we created in the modals 
// const bcrypt=require('bcrypt')
// const jwt=require('jsonwebtoken');
// const { Router }=require("express");
// const router=Router();
// const profileRouter=require("../routes/profileRoute");
// router.use("/profile",profileRouter)
// router.post('/', async (req,res)=>{
    
//   let user=await userModel.findOne({email: req.body.email});//first you have to check if that email user exists
  
//   console.log(user);
//   if(!user)  //if email written is wrong then user mei kuch ni mileyga i.e null otherwise yahan koi data hoga
//     {return(res.send("your email/password is incorrect"))}; //so it doesnt helps the hacker in identifying if the issue is in password or the email

//   console.log("hi");
//   //now user.password is the hashed password we saved and body.password is the password user is entering rightnow through form
//   //so comparing both and if matched we allow login
//   bcrypt.compare(req.body.password, user.password, function(err, result) {
//     if(!result){
   
//     console.log("passwords do not match")  
//     res.send("your email/password is incorrect") 
// } else {
//      console.log("password matched")
     
//      let token=jwt.sign({email: user.email}, "shhhhh"); //after logging in jwt setup karna pareyga
//      res.cookie("token",token);
//     //  res.send("you are logged in");
//     // res.send("wow");


//     res.redirect('http://localhost:5173/profile');

// }
// console.log(result);
// });
// });


// module.exports = router;