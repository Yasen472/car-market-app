import React, { useEffect, useState } from 'react';
import './listings.css';
import Filters from '../filters/filters.js';
import axios from 'axios';
import { baseURL } from '../utils/constant.js';
import { useNavigate } from 'react-router-dom';

function Listings() {
  const [cars, setCars] = useState([]);
  const [showListing, setShowListing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/get`);
        const carData = response.data;
        if (carData.length > 0) {
          setCars(carData);
        }
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    };

    fetchData();
  }, []);

  const handleViewButtonClick = (carId) => {
    debugger;
    setShowListing(true);
    navigate(`/currentListing/${carId}`);
  };

  return (
    <>
      <div id="container">
        {cars.map((car, index) => (
          <div className="cards" key={index}>
            <img src={car.image} className='listing-image' />
            <div className="card_details">
              <div className="name">{car.brand} {car.model}</div>
              <div className="underline" />
              <div className='car-details'>
                <div>Price: {car.price}</div>
                <div>Kilometres: {car.kilometres}</div>
                <div>Location: {car.location}</div>
              </div>
              {/* Use an arrow function to pass car.id as an argument */}
              <button onClick={() => handleViewButtonClick(car._id)} className='view-btn'>View</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Listings;
