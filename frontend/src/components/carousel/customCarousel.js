import React, { useState } from 'react';
import './customCarousel.css'; // Add custom styles for the carousel
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

const CustomCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
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
            <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} className="carousel-image" />
            <button className="carousel-arrow right" onClick={goToNext}>
                <FaArrowRight />
            </button>
        </div>
    );
};

export default CustomCarousel;
