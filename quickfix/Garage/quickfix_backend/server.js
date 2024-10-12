// server.js

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Initialize environment variables
dotenv.config();

// Initialize express
const app = express();

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection string (use your own URI)
const dbURI =
  process.env.MONGO_URI ||
  "mongodb+srv://tharinduherath2426:Therath2426@cluster0.3nubx.mongodb.net/Quickfix";

// Connect to MongoDB
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Define a Mongoose schema for Customer_Towing
const customerTowingSchema = new mongoose.Schema({
  vehicleType: String,
  currentLocation: String,
  destinationLocation: String,
  issue: String,
  contactInfo: String,
});

// Create a Mongoose model for Customer_Towing
const CustomerTowing = mongoose.model("Customer_Towing", customerTowingSchema);

// Define a Mongoose schema for Towing_Feedback (new schema)
const feedbackSchema = new mongoose.Schema({
  email: { type: String, default: "" }, // Optional field
  rating: { type: Number, required: true }, // Rating is required
  comment: { type: String, default: "" }, // Optional comment
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

// Create a Mongoose model for Towing_Feedback
const TowingFeedback = mongoose.model("Towing_Feedback", feedbackSchema);

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
  "Customer_Profile",
  customerProfileSchema
);

// Routes

// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Get all towing requests
app.get("/api/towing", async (req, res) => {
  try {
    const towingRequests = await CustomerTowing.find();
    res.json(towingRequests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching towing requests" });
  }
});

// Create a new towing request
app.post("/api/towing", async (req, res) => {
  const {
    vehicleType,
    currentLocation,
    destinationLocation,
    issue,
    contactInfo,
  } = req.body;

  try {
    const newRequest = new CustomerTowing({
      vehicleType,
      currentLocation,
      destinationLocation,
      issue,
      contactInfo,
    });

    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: "Error creating towing request" });
  }
});

// New endpoint for submitting feedback
app.post("/api/feedback", async (req, res) => {
  const { email, rating, comment } = req.body;

  // Validation
  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5" });
  }

  try {
    const newFeedback = new TowingFeedback({
      email,
      rating,
      comment,
    });

    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(500).json({ message: "Error submitting feedback" });
  }
});

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
  }
});

// Get a customer profile by ID
app.get("/api/profile/:id", async (req, res) => {
  try {
    const profileId = req.params.id;
    console.log("Fetching profile for ID:", profileId);

    const profile = await CustomerProfile.findById(profileId);

    if (!profile) {
      console.log(`Profile not found for ID: ${profileId}`);
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Error fetching profile", error });
  }
});

// Update an existing profile by ID
app.put("/api/profile/:id", async (req, res) => {
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
    const updatedProfile = await CustomerProfile.findByIdAndUpdate(
      req.params.id,
      { image, name, email, contact, vehicleType, birthday, gender, jobRole },
      { new: true } // Return the updated profile
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

// Delete a profile by ID
app.delete("/api/profile/:id", async (req, res) => {
  try {
    const deletedProfile = await CustomerProfile.findByIdAndDelete(
      req.params.id
    );

    if (!deletedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting profile:", error);
    res.status(500).json({ message: "Error deleting profile" });
  }
});

// Start the server
module.exports = app;
