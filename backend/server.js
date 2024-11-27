const express = require('express'); // Import Express
const bodyParser = require('body-parser'); // Import Body Parser
const cors = require('cors'); // Import CORS for Cross-Origin requests
require('dotenv').config(); // Load environment variables from .env file
require('./models/db.js'); // Connect to MongoDB using db.js

// Import Routers
const loginRouter = require('./router/loginRouter.js');
const signupRouter = require('./router/signupRouter.js');
const moviesRouter = require('./router/moviesRouter.js');
const commentsRoutes = require('./router/comments.js');
const imageRoutes = require('./router/imageRoutes.js');

// Initialize Express App
const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON data in requests
app.use(cors()); // Enable Cross-Origin Resource Sharing

// API Routes
app.use('/authh', loginRouter); // Login Route
app.use('/auth', signupRouter); // Signup Route
app.use('/movies', moviesRouter); // Movies Route
app.use('/comments', commentsRoutes);
app.use('/api', imageRoutes);


// Test Endpoint
app.get('/ping', (req, res) => {
    res.send('Server is alive!'); // Basic health check
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log error stack
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
