const { Mongoose, default: mongoose } = require("mongoose");

const requestschema=new mongoose.Schema({
requester:{type:mongoose.Schema.Types.ObjectId, ref:'user', required:true},
serviceprovider:{type:mongoose.Schema.Types.ObjectId, ref:'user',required:true},
skill:{type:mongoose.Schema.Types.ObjectId, ref:'skillschema',required:true},
message:{type:String},
status:{type:String, enum:['Pending','Accepted','Rejected'], default:'Pending', required:true},

})
module.exports=mongoose.model("Requests",requestschema);



// const { Mongoose, default: mongoose } = require("mongoose");

// const requestschema=new mongoose.Schema({
// requester:{type:mongoose.Schema.Types.ObjectId, ref:'user', required:true},
// serviceprovider:{type:mongoose.Schema.Types.ObjectId, ref:'user',required:true},
// skill:{type:mongoose.Schema.Types.ObjectId, ref:'skillschema',required:true},
// message:{type:String},
// status:{type:String, enum:['Pending','Accepted','Rejected'], default:'Pending', required:true},
// timecreated:{type:Date, default:Date.now},

// })
// module.exports=mongoose.model("Requests",requestschema);
