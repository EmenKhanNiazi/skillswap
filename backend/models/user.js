// const mongoose= require('mongoose');
// mongoose.connect(`mongodb+srv://banok540:skillswappassword@mycluster.maqxj.mongodb.net/?retryWrites=true&w=majority&appName=myCluster/authtestapp`);

// const userSchema = new mongoose.Schema({
// username: {type:String, required:true},
// email:{type:String, required:true, unique:true} ,
// password: {type:String, required:true},
// age: Number,
// skills: [{ 
//     //foreign key
//     type: mongoose.Schema.Types.ObjectId, ref: 'skillschema'  
// }], // Array of skill references
// requests:[{
//      type:mongoose.Schema.Types.ObjectId, ref: 'requestschema'
// }],
// location: String, // Optional location
// bio: {type:String, required:true},      // Short user description
// // requests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Request' }] //aray to track reqs send to the user
// });

// module.exports= mongoose.model("user",userSchema);

const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://banok540:skillswappassword@mycluster.maqxj.mongodb.net/?retryWrites=true&w=majority&appName=myCluster/authtestapp`);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  location: { type: String, required: true },
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }], // Reference to Skill model
  bio: { type: String, required: false },
  
  // New field for sent requests
  sentRequests: [
    {
      offeredBy: { type: String, required: true }, // Name of the skill provider
      proficiency: { type: String, required: true }, // Proficiency of the skill
      description: { type: String, required: false }, // Optional description
      dateAdded: { type: Date, default: Date.now } // Automatically adds current date
    }
  ]
});

module.exports = mongoose.model('User', userSchema);


// onst mongoose = require('../db'); // Import centralized connection

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   age: Number,
//   skills: [
//     { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' } // Reference Skill schema
//   ],
//   requestsSent: [
//     { type: mongoose.Schema.Types.ObjectId, ref: 'SwapRequest' } // Reference SwapRequest schema
//   ],
//   requestsReceived: [
//     { type: mongoose.Schema.Types.ObjectId, ref: 'SwapRequest' } // Reference SwapRequest schema
//   ],
//   location: String,
//   bio: { type: String, required: true },
// });

// module.exports = mongoose.model('User', userSchema);



// const mongoose= require('mongoose');
// mongoose.connect(`mongodb+srv://banok540:skillswappassword@mycluster.maqxj.mongodb.net/?retryWrites=true&w=majority&appName=myCluster/authtestapp`);

// const userSchema = new mongoose.Schema({
// username: {type:String, required:true},
// email:{type:String, required:true, unique:true} ,
// password: {type:String, required:true},
// age: Number,
// skills: [{ 
//     //foreign key
//     type: mongoose.Schema.Types.ObjectId, ref: 'skillschema'  
// }], // Array of skill references
// requests:[{
//      type:mongoose.Schema.Types.ObjectId, ref: 'requestschema'
// }],
// location: String, // Optional location
// bio: {type:String, required:true},      // Short user description
// // requests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Request' }] //aray to track reqs send to the user
// });

// module.exports= mongoose.model("user",userSchema);



//here we exported the user model and we can require it in app.js