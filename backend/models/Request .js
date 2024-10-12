const mongoose = require('mongoose');

// Define the Request schema
const RequestSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String },
  messages: { type: String, default: 'pending' },
  Time: { type: String}
});

// Export the model
module.exports = mongoose.model('Request', RequestSchema);
