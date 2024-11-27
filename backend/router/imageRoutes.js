const express = require('express');
const { uploadImage, getImages, searchImages, deleteImage } = require('../controller/imageController');

const router = express.Router();

// Routes
router.post('/image/upload', uploadImage);
router.get('/image', getImages);
router.get('/image/search/:query', searchImages); // Search route
router.delete('/image/:id', deleteImage);

module.exports = router;
