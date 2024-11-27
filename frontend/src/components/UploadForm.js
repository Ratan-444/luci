import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

const UploadForm = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);

    const handleImageUpload = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file); // Convert image to Base64
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) {
            alert('Please select an image');
            return;
        }

        try {
            const base64Image = await handleImageUpload(image);
            const payload = { title, image: base64Image };
            await axios.post('http://localhost:5000/api/image/upload', payload);
            alert('Image uploaded successfully');
            window.location.href = '/'; // Navigate to gallery
        } catch (err) {
            alert('Failed to upload image');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
            <button type="submit">Upload</button>
            <Link to="/all-movies">all movies</Link>
        </form>
        
    );
};

export default UploadForm;
