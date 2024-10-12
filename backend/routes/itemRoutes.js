// requestRoutes.js
const express = require('express');
const router = express.Router();
const Request = require('../models/Request '); // Ensure the correct model import
const mongoose = require('mongoose');

// Get all requests
router.get('/', async (req, res) => {
    try {
        const requests = await Request.find();
        console.log("Fetched Requests: ", requests);
        res.status(200).json(requests);
    } catch (error) {
        console.error('Error fetching requests:', error);
        res.status(500).json({ message: 'Failed to fetch requests', error });
    }
});



// Delete request by name



module.exports = router;
