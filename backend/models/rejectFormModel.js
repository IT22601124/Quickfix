const mongoose = require('mongoose');

// Define the schema for RejectForm
const rejectFormSchema = new mongoose.Schema({
  reason: { type: String, required: true },
  description: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }, // Optional: track submission time
});

// Create a model from the schema
const RejectForm = mongoose.model('RejectForm', rejectFormSchema);

module.exports = RejectForm;
