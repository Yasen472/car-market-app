import React, { useState } from 'react';
import './customCarousel.css'; 
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { MdDelete } from "react-icons/md"; 

const CarouselUpload = ({ images, onImageUpload, onDeleteImage }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onImageUpload(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteImage = () => {
        onDeleteImage(currentIndex);
    };

    // Ensure images is defined and not empty before rendering
    if (!images || images.length === 0) {
        return null; // or render a placeholder or loading state
    }

    return (
        <div className="carousel-container">
            <button className="carousel-arrow left" onClick={goToPrevious}>
                <FaArrowLeft />
            </button>
            <div className="carousel-image-container">
                <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} className="carousel-image" />
                <div className="image-overlay">
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="image-upload-input" />
                    <button className="delete-image-button" onClick={handleDeleteImage}>
                        <MdDelete />
                    </button>
                </div>
            </div>
            <button className="carousel-arrow right" onClick={goToNext}>
                <FaArrowRight />
            </button>
        </div>
    );
};

export default CarouselUpload;
