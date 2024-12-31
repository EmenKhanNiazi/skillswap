const mongoose = require('mongoose');
const SwapRequest = require('./models/requestschema'); // Adjust path to your schema file

// Connect to MongoDB
mongoose.connect('mongodb+srv://banok540:skillswappassword@mycluster.maqxj.mongodb.net/authtestapp?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Connection Error:', err));

// Create and save a test request
const testRequest = new SwapRequest({
  skillId: '6130f50e4c7e4d002b5c2f20',
  requesterId: '6130f50e4c7e4d002b5c2f21',
  providerId: '6130f50e4c7e4d002b5c2f22',
  exchangeMessage: 'I can teach you guitar.',
  requestMessage: 'Can you teach me piano?',
});

testRequest
  .save()
  .then(result => console.log('Saved:', result))
  .catch(err => console.error('Save Error:', err))
  .finally(() => mongoose.connection.close());
