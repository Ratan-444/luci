import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Allmovies = () => {
  const [movies, setMovies] = useState([]);
  const [comments, setComments] = useState([]); // State to store comments
  const [newComment, setNewComment] = useState(''); // State to hold the input value

  useEffect(() => {
    // Fetch movies
    fetch('http://localhost:5000/movies/movies')
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error('Error fetching movies:', error));

    // Fetch existing comments
    fetch('http://localhost:5000/comments')
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error('Error fetching comments:', error));
  }, []);

  const handleAddComment = () => {
    const comment = { text: newComment, likes: 0 };
    fetch('http://localhost:5000/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment),
    })
      .then((response) => response.json())
      .then((newComment) => {
        setComments([...comments, newComment]);
        setNewComment(''); // Clear input
      })
      .catch((error) => console.error('Error adding comment:', error));
  };

  const handleLike = (id) => {
    fetch(`http://localhost:5000/comments/${id}/like`, { method: 'PUT' })
      .then((response) => response.json())
      .then((updatedComment) => {
        setComments(
          comments.map((comment) =>
            comment._id === id ? { ...comment, likes: updatedComment.likes } : comment
          )
        );
      })
      .catch((error) => console.error('Error liking comment:', error));
  };

  return (
    <div>
      <h1>Top 10 Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            <h2>{movie.title}</h2>
            <img
              src={movie.image}
              alt={movie.title}
              style={{ width: '200px', height: '300px', marginBottom: '10px' }}
            />
          </li>
        ))}
      </ul>

      <div>
        <h2>Comments</h2>
        <input
          type="text"
          value={newComment}
          placeholder="Add a comment"
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Post Comment</button>

        <ul>
          {comments.map((comment) => (
            <li key={comment._id}>
              <p>{comment.text}</p>
              <button onClick={() => handleLike(comment._id)}>Like ({comment.likes})</button>
            </li>
            
          ))}
        </ul>
        <Link to="/image">images</Link>
      </div>
    </div>
  );
};

export default Allmovies;
