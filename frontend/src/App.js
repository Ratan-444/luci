import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Allmovies from './components/Allmovies';
import Onemovies from './components/Onemovies';
import UploadForm from './components/UploadForm';
import Gallery from './components/Gallery';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/all-movies" element={<Allmovies />} />
          <Route path="/movie/:id" element={<Onemovies />} />
          <Route path="/image" element={<Gallery />} />
          <Route path="/image/upload" element={<UploadForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;


