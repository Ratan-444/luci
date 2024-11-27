import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/image');
            setImages(response.data);
        } catch (err) {
            console.error('Failed to fetch images:', err);
        }
    };

    const handleSearch = async () => {
        if (!searchQuery) {
            fetchImages(); // Reset to all images if no query
            return;
        }
        try {
            const response = await axios.get(`http://localhost:5000/api/image/search/${searchQuery}`);
            setImages(response.data);
        } catch (err) {
            console.error('Failed to search images:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/image/${id}`);
            setImages(images.filter((image) => image._id !== id));
        } catch (err) {
            console.error('Failed to delete image:', err);
        }
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Search by title"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div>
                {images.map((image) => (
                    <div key={image._id}>
                        <img src={image.image} alt={image.title} style={{ width: '200px' }} />
                        <h3>{image.title}</h3>
                        <button onClick={() => handleDelete(image._id)}>Delete</button>
                    </div>
                ))}
            </div>
            <Link to="/image/upload">images to upload</Link>
        </div>
    );
};

export default Gallery;
