const mongoose = require('mongoose');

const skillschema = new mongoose.Schema({
    name: { type: String, required: true },
    proficiencyLevel: { type: String, required: true },
    description: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who added the skill
});

module.exports = mongoose.model("Skill", skillschema);




// const mongoose = require('mongoose');

// const skillschema= new mongoose.Schema({
//   skillId: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
//   requesterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   exchangeMessage: { type: String, required: true },
//   requestMessage: { type: String, required: true },
//   status: { type: String, default: 'pending' }, // Status: pending, accepted, rejected
// });

// module.exports = mongoose.model('SwapRequest', skillschema);





// const mongoose = require('../db'); // Import centralized connection

// const skillSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   proficiencyLevel: { type: String, required: true },
//   description: { type: String },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// });

// module.exports = mongoose.model('Skill', skillSchema);

