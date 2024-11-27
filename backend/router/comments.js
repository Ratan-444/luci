const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// Get all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error });
  }
});

// Add a new comment
router.post('/', async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error });
  }
});

// Like a comment
router.put('/:id/like', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment) {
      comment.likes += 1;
      const updatedComment = await comment.save();
      res.status(200).json(updatedComment);
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error liking comment', error });
  }
});

module.exports = router;
