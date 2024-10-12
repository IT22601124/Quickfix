const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Ensure this is declared only once
require('dotenv').config(); // For environment variables

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Replaces body-parser

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://tharinduherath2426:Therath2426@cluster0.3nubx.mongodb.net/Quickfix';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Test Route
app.get('/', (req, res) => {
  res.send('API is working!');
});

// Add other API routes here (e.g., CRUD operations)
const requestRoutes = require('./routes/itemRoutes');  // Import the request route
app.use('/api/requests', requestRoutes);  // Use the request routes

// Existing code...
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
// Remaining code...


const rejectFormRoutes = require('./routes/rejectFormRoutes');
app.use('/api/rejectform', rejectFormRoutes);




// Define a Mongoose schema for Customer_Profile
const customerProfileSchema = new mongoose.Schema({
  image: String, // URL or path of the uploaded image
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  vehicleType: { type: String, required: true },
  birthday: { type: Date, required: true },
  gender: { type: String, required: true },
  jobRole: { type: String, required: true },
});

// Create a Mongoose model for Customer_Profile
const CustomerProfile = mongoose.model(
  "towing_profiles",
  customerProfileSchema
);

// Create a new profile
app.post("/api/profile", async (req, res) => {
  const {
    image,
    name,
    email,
    contact,
    vehicleType,
    birthday,
    gender,
    jobRole,
  } = req.body;

  try {
    const newProfile = new CustomerProfile({
      image,
      name,
      email,
      contact,
      vehicleType,
      birthday,
      gender,
      jobRole,
    });

    const savedProfile = await newProfile.save();
    console.log("Profile saved:", savedProfile); // Log saved profile for debugging
    res.status(201).json(savedProfile);
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ message: "Error creating profile" });
  }   });


  app.get('/api/user/name/:name', async (req, res) => {
    const { name } = req.params;
    console.log(`Fetching profile for name1: ${name}`); // Log the name being searched
    try {
      const profile = await CustomerProfile.findOne({ name });
      if (!profile) {
        console.log('Profile not found for name:', name); // Log if profile isn't found
        return res.status(404).json({ message: "Profile not found" });
      }
      res.json(profile);
    } catch (error) {
      console.error("Error fetching profile by name:", error);
      res.status(500).json({ message: "Error fetching profile" });
    }
  });
  

  app.put('/name/:name', async (req, res) => {
    const { name } = req.params;
    const updatedData = req.body;
  
    try {
      const updatedProfile = await CustomerProfile.findOneAndUpdate(
        { name },
        updatedData,
        { new: true, runValidators: true }
      );
  
      if (!updatedProfile) {
        return res.status(404).json({ message: "Profile not found" });
      }
  
      res.json(updatedProfile);
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Error updating profile" });
    }
  });
  


  const requestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    id: String,
    message: { type: String, required: true  },
    Time: { type: String, required: true  },
  });
  
  // Create and export the Request model
  const Request = mongoose.model('requests', requestSchema);

  app.delete('/api/requests/name/:name', async (req, res) => {
    const { name } = req.params;
  
    try {
      // Find and delete the request by name
      const deletedRequest = await Request.findOneAndDelete({ name });
  
      if (!deletedRequest) {
        return res.status(404).json({ message: "Request not found" });
      }
  
      res.status(200).json({ message: "Request deleted successfully", deletedRequest });
    } catch (error) {
      console.error("Error deleting request:", error);
      res.status(500).json({ message: "Error deleting request" });
    }
  });



// Define a Mongoose schema for Customer_Profile
const userPruserofileSchema = new mongoose.Schema({
  image: String, // URL or path of the uploaded image
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  vehicleType: { type: String, required: true },
  birthday: { type: Date, required: true },
  gender: { type: String, required: true },
  jobRole: { type: String, required: true },
});

// Create a Mongoose model for Customer_Profile
const userProfile = mongoose.model(
  "userprofiles",
  userPruserofileSchema
);
app.get('/api/userd/name/:name', async (req, res) => {
  const { name } = req.params;
  console.log(`Fetching profile for name1: ${name}`); // Log the name being searched
  try {
    const profile = await userProfile.findOne({ name });
    if (!profile) {
      console.log('Profile not found for name:', name); // Log if profile isn't found
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (error) {
    console.error("Error fetching profile by name:", error);
    res.status(500).json({ message: "Error fetching profile" });
  }
});

app.put('/api/users/name/:name', async (req, res) => {
  const { name } = req.params;
  const updatedData = req.body;

  try {
    const updatedUser = await userProfile.findOneAndUpdate(
      { name }, 
      updatedData, 
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User profile updated successfully", updatedUser });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Error updating user profile" });
  }
});



  module.exports = app;


