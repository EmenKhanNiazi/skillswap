const express=require('express')
const app=express()
const mongoose=require('mongoose');
const userModel=require('./models/user'); //we have the user modal in usermodel that we created in the modals 
const skillModel=require('./models/skillschema');
const cors=require('cors'); //installed cors in backend to allow requests from frontend

const cookieParser = require('cookie-parser');
const path= require("path");

const user = require('./models/user');

// const userRoutes = require('./routes/userroute');
// app.use('', userRoutes); // Use the user routes

//importing routes
const signinRouter=require("./routes/signinRoute");
const signupRouter=require("./routes/signupRoute");
const logoutRouter=require("./routes/logoutRoute");
const profileRouter=require("./routes/profileRoute");
const skillsRouter=require("./routes/skillsRoute");
const myskillsRouter=require("./routes/myskillsRoute");
const requestRouter=require("./routes/requestRoute")
const swapreq=require("./routes/swaprequestRoute");
// const newreq=require("./routes/newrequestswap");
const userRoutes = require('./routes/userroute');
const newreq=require('./routes/new2requestswap');

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser())  



app.get('/',(req,res)=>{
    res.send('Welcome');
    console.log("hi");
});


app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'], // Array of allowed origins //now both can interact with one another
    methods: ['GET', 'POST'], // Allowed HTTP methods
    credentials: true, // Allow cookies to be sent
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
//get for no change in server and post for making a change in server eg. logout user k data hat rha
app.use("/signin", signinRouter);
app.use("/signup",signupRouter);
app.use("/logout", logoutRouter);
app.use("/skills", skillsRouter);
app.use("/profile",profileRouter);
app.use("/myskills",myskillsRouter);
app.use("/requests",requestRouter);
app.use("/swap-request",swapreq);
// app.use("/request-swap",newreq);
app.use("/users",userRoutes);
app.use("/request-swap",newreq);








app.post('/displayskils', async(rrq,res)=>{
const token=req.cookies.token;
if(!token) return res.send("unauthorized");
const decoded=jwt.verify(token,'shhh')
const user=await userModel.findById({token})
if(!user) res.send("user not found");

})

app.listen(3000);

// app.post('/skills', async(req,res)=>{
  
//   try{
//     let{name, proficiencyLevel, description}=req.body;
//     let createdSkill=await skillModel.create({
//       name,
//       proficiencyLevel,
//       description,
     
//     });
//   let token=jwt.sign({email}, 'shhhh');
//   res.cookie('token', token);
//   res.status(201).send(createdSkill);
//   }catch(error){
//     console.error("Error creating skill:", error); // Log the error
//     res.status(500).send("An error occured while creating a skill")
//   }

// });
// app.get('/skills',async(req,res)=>{
// const token=req.cookies.token;
// if(!token) return res.status(401).send("unauthorized");
// try{
//   const decoded=jwt.verify(token,'shhhh');
//   const user=await userModel.findOne({email:email});
//   if(!user) return res.status(404).send("User not found");
//   res.json({
//     // const skills= await user.skills; //skills mei user ki skills
//   })
//   //now displaying jitni skills 
//   for(let i=0; i<skill.length;i++){
//     res.json({name: skills.name, proficiencyLevel: skills.proficiencyLevel,
//       description:skills.description,


//     })
//   }
// }
// catch(error){
//   res.status(400).send("invalid token");
// }
// })



// app.get('/profile', async(req,res)=>{
//   // let user=await userModel.findOne({email: req.body.email});
//   // if(!user){
//   //   res.send("user not found")
//   // }
//   const email=req.cookies.email;
//   let user=await userModel.findOne({email: email});
//    if(!user){
//    return res.send("user not found");
//   }
//   //sending user data
//   res.json({ name:user.name,
//      email:user.email, 
//      age:user.age, 
//      password:user.password,
//      location:user.location,
//       bio:user.bio
//     });
// });




























//refering -> id rakh raha not physical. ->embedding (we can read data fastly and also by id)

// app.get('/', function(req,res){
// //setting cookie
// res.cookie("name","harsh");
// res.send("done");
// })

// app.get("/checking",function(req,res){
    
//     console.log(req.cookies)
//     console.log(req.cookies)
//     // res.send("checking")
//     res.send(req.cookies)
// })



// app.get("/", function(req,res){
//     bcrypt.genSalt(10, function(err, salt) {
//             bcrypt.hash("myPlaintextPassword", salt, function(err, hash) {
//               console.log(hash)
          
//         });
//     });
// })




//without skills
// app.post('/signup',  (req, res) => {
// let{username,email,password,age,location,skills,bio}=req.body; //data bahir nikal r
//     bcrypt.genSalt(10, (err, salt)=> {
//             bcrypt.hash(password, salt,async (err, hash) => {
//               console.log(hash);
            
//             let createdUser=await userModel.create({
//             username,
//             email,
//             age,
//             password:hash,  //password value is now hash not the pasword
//             location,
//             skills,
//             bio,

//  })
//  let token=jwt.sign({email}, "shhhhh"); //user ka email rakhna chahte and secret key de r sath, we get a token and send this token to frontend as a cookie
//  res.cookie("token",token);
//  res.send(createdUser);//sending response(the created user)
//  res.redirect('/signin');

//             })
//         })
//             //account abhi abhi banane k baad usse abhi abhi login karwa skte
// });

//correct one
// app.post('/signup', async (req, res) => {
//     let { username, email, password, age, location, skills, bio } = req.body;
  
//     // Convert skills from string to an array
//     let skillsArray = skills.split(',').map((skill) => skill.trim());
  
//     bcrypt.genSalt(10, (err, salt) => {
//       bcrypt.hash(password, salt, async (err, hash) => {
//         console.log(hash);
  
//         let createdUser = await userModel.create({
//           username,
//           email,
//           age,
//           password: hash, // Save the hashed password
//           location,
//           skills: skillsArray, // Save as an array in the database
//           bio,
//         });
  
//         let token = jwt.sign({ email }, 'shhhhh'); // Create a token with the user's email
//         res.cookie('token', token); // Send token as a cookie
//         res.send(createdUser); // Send the created user as a response
//         res.redirect('/signin'); // Redirect to the signin page
//       });
//     });
//   });