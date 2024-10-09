import React, { useState } from 'react';
import './customCarousel.css';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const CarouselListing = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    if (!images || images.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="carousel-container">
            <button 
                className="carousel-arrow left" 
                onClick={goToPrevious} 
                aria-label="Previous Image"
            >
                <FaArrowLeft />
            </button>
            <img 
                src={images[currentIndex]} 
                alt={`Image ${currentIndex + 1} of ${images.length}`} 
                className="carousel-image" 
            />
            <button 
                className="carousel-arrow right" 
                onClick={goToNext} 
                aria-label="Next Image"
            >
                <FaArrowRight />
            </button>
            <div className="thumbnail-container">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className={`thumbnail ${currentIndex === index ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CarouselListing;
