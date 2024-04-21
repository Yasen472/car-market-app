import React, { useState } from 'react';
import './slider.css'; // Import CSS file for styling

const SliderYear = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);

  const handleMinChange = (e) => {
    setMinPrice(parseInt(e.target.value));
  };

  const handleMaxChange = (e) => {
    setMaxPrice(parseInt(e.target.value));
  };

  return (
    <div className="slider-container">
      <label htmlFor="min-price">Min Year:</label>
      <input
        type="range"
        id="min-price"
        name="min-price"
        min="0" 
        max="1000"
        step="10"
        value={minPrice}
        onChange={handleMinChange}
      />
      <span>${minPrice}</span>

      <label htmlFor="max-price">Max Year:</label>
      <input
        type="range"
        id="max-price"
        name="max-price"
        min="0"
        max="1000"
        step="10"
        value={maxPrice}
        onChange={handleMaxChange}
      />
      <span>${maxPrice}</span>
    </div>
  );
};

export default SliderYear;
