const express = require('express');
const router = express.Router();
const RejectForm = require('../models/rejectFormModel');


// Route to submit rejection form data
router.post('/', async (req, res) => {
  const { reason, description } = req.body;

  // Validate request body
  if (!reason || !description) {
    return res.status(400).json({ error: 'Reason and description are required.' });
  }

  try {
    // Create a new rejection form document
    const newRejectForm = new RejectForm({
      reason,
      description,
    });

    // Save the form to the database
    await newRejectForm.save();
    
    res.status(201).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while submitting the form.' });
  }
});

module.exports = router;
