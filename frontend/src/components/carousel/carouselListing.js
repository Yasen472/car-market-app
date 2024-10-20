import React, { useState, useEffect } from 'react';
import './customCarousel.css';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const CarouselListing = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);

    const goToPrevious = (e) => {
        e.stopPropagation();
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const goToNext = (e) => {
        e.stopPropagation();
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        if (isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isExpanded]);

    if (!images || images.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`carousel-container ${isExpanded ? 'expanded' : ''}`}>
            <img
                src={images[currentIndex]}
                alt={`Image ${currentIndex + 1} of ${images.length}`}
                className="carousel-image"
                onClick={toggleExpand}
            />
            <button
                className="carousel-arrow left"
                onClick={goToPrevious}
                aria-label="Previous Image"
            >
                <ChevronLeft />
            </button>
            <button
                className="carousel-arrow right"
                onClick={goToNext}
                aria-label="Next Image"
            >
                <ChevronRight />
            </button>
            {isExpanded && (
                <div className="expanded-image-overlay" onClick={toggleExpand}>
                    <div className="expanded-image-container">
                        <img
                            src={images[currentIndex]}
                            alt={`Expanded Image ${currentIndex + 1} of ${images.length}`}
                            className="expanded-image"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                    <button
                        onClick={toggleExpand}
                        className="close-button"
                        aria-label="Close expanded image"
                    >
                        <X />
                    </button>
                </div>
            )}
        </div>
    );
};

export default CarouselListing;