// Inside ./routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile'); // Assuming you've created a Profile model

// POST route to create a profile
router.post('/', async (req, res) => {
  try {
    const { name, email, contact, birthday, gender, jobRole, image } = req.body;
    
    // Validate required fields
    if (!name || !email || !contact || !birthday || !gender || !jobRole) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create a new profile
    const newProfile = new Profile({
      name,
      email,
      contact,
      birthday,
      gender,
      jobRole,
      image,
    });

    await newProfile.save();  // Save profile to the database
    res.status(201).json(newProfile);
  } catch (error) {
    res.status(500).json({ message: 'Error saving profile', error });
  }
});

module.exports = router;
