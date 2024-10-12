// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  message: { type: String, required: true },
  phone: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
