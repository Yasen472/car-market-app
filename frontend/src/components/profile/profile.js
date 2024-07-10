import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../utils/constant.js';
import { useAuth } from '../auth/authContext.js';
import './profile.css';
import { Link, useNavigate } from 'react-router-dom';
import CustomCarousel from '../carousel/customCarousel.js';

function Profile() {
    const [userCars, setUserCars] = useState([]);
    const { userId } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserCars = async () => {
            try {
                const response = await axios.get(`${baseURL}/get`);
                const userOwnedCars = response.data.filter(car => car.ownerId === userId);
                setUserCars(userOwnedCars);
            } catch (error) {
                console.error('Error fetching user cars:', error);
            }
        };
        fetchUserCars();
    }, [userId]);

    const handleViewButtonClick = (carId) => {
        navigate(`/currentListing/${carId}`);
    };

    return (
        <div className="profile-container">
            <h1>My Listings</h1>
            <Link to='/carListing'>
                <button className='create-btn'>Create a new listing</button>
            </Link>
            <div className="user-cars">
                {userCars.map((car) => (
                    <div className="car-card" key={car._id}>
                        <CustomCarousel images={car.images} />
                        <div className="car-details">
                            <h2>{car.make} {car.model}</h2>
                            <p>Price: {car.price}</p>
                            <p>Kilometres: {car.kilometres}</p>
                            <p>Location: {car.location}</p>
                            <button
                                onClick={() => handleViewButtonClick(car._id)}
                                className="view-btn"
                            >
                                View
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Profile;

