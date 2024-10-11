import React, { useState } from 'react';
import './squareCarousel.css';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const SquareCarousel = ({ images, showArrows = true }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = (event) => {
        event.preventDefault(); // Prevent default action
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const goToNext = (event) => {
        event.preventDefault(); // Prevent default action
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    if (!images || images.length === 0) {
        return null; 
    }

    return (
        <div className="square-carousel-container">
            {showArrows && (
                <button className="carousel-arrow left" onClick={goToPrevious}>
                    <FaArrowLeft />
                </button>
            )}
            <div className="square-carousel-image-wrapper">
                <img 
                    src={images[currentIndex]} 
                    alt={`Image ${currentIndex + 1}`} 
                    className="square-carousel-image" 
                />
            </div>
            {showArrows && (
                <button className="square-carousel-arrow right" onClick={goToNext}>
                    <FaArrowRight />
                </button>
            )}
        </div>
    );
};

export default SquareCarousel;
