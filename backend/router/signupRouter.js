const express = require('express'); 
const {signup,gretting} = require('../controller/signup.js'); // Import the controller

const router = express.Router(); // Correctly create the router instance

// Define the signup POST route
router.post('/signup', signup); 
router.get('/gretting', gretting);// Call the appropriate controller function
module.exports = router; // Export the router
