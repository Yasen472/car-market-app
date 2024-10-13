import React, { useState } from 'react';
import './customCarousel.css';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const CustomCarousel = ({ images }) => {

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    if (!images || images.length === 0) {
        showArrows = false;
        return null;
    }

    return (
        <div className="carousel-container">
            {showArrows? (
                <>
                    <button className="carousel-arrow left" onClick={goToPrevious}>
                        <FaArrowLeft />
                    </button>
                    <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} className="carousel-image" />
                    <button className="carousel-arrow right" onClick={goToNext}>
                        <FaArrowRight />
                    </button>
                </>
            ) : (
                <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} className="carousel-image" />)}
        </div>
    );
};

export default CustomCarousel;
