// Inside ./models/Profile.js
const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  birthday: { type: String, required: true },
  gender: { type: String, required: true },
  jobRole: { type: String, required: true },
  image: { type: String },  // If storing the image URI
});

module.exports = mongoose.model('Profile', ProfileSchema);
