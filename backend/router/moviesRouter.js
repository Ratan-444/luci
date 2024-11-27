const express = require('express');
const { allmovies } = require('../controller/movies.js'); // Destructure to get the specific functions

const router = express.Router(); // Create the router instance

// Define routes with corresponding controller functions
router.get('/movies', allmovies); // Fetch all movies
//router.get('/movies/:id', onemovies); // Fetch movie by ID

module.exports = router; // Export the router
