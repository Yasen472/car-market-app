import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/authContext.js';
import './profile.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import Loader from '../loader/loader.js';
import CarCard from '../cards/carCard.js';

function Profile() {
    const [favouriteCars, setFavouriteCars] = useState([]);
    const [userCars, setUserCars] = useState([]);
    const [loading, setLoading] = useState(false);
    const { userId } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCars = async () => {
            try {
                setLoading(true); // Start loading
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get?limit=all`);
                const cars = response.data.cars;

                const userOwnedCars = cars.filter(car => car.ownerId === userId);
                const favouriteCars = cars.filter(car => car.bookmarkedBy.includes(userId));

                setFavouriteCars(favouriteCars);
                setUserCars(userOwnedCars);
            } catch (error) {
                console.error('Error fetching cars:', error);
            } finally {
                setLoading(false); // End loading
            }
        };

        fetchCars();
    }, [userId]);

    const handleViewButtonClick = (carId) => {
        navigate(`/currentListing/${carId}`);
    };

    // If loading, show the Loader component in the middle of the page
    if (loading) {
        return <Loader />;
    }

    return (
        <div className="profile-page-container">
            <div className="profile-container">
                {/* My Listings Section */}
                <div className="section my-listings">
                    <div className="profile-header">
                        <h1>My Listings</h1>
                        <Link to='/carListing' className="create-btn-link">
                            <FaPlus className="create-btn-icon" />
                        </Link>
                    </div>
                    <div className="car-list">
                        {userCars.length > 0 ? (
                            userCars.map((car) => (
                                <CarCard 
                                    key={car._id} // Unique key for each car
                                    car={car} // Pass car data as a prop
                                    onClick={() => handleViewButtonClick(car._id)} // Pass click handler
                                />
                            ))
                        ) : (
                            <p>No cars found in your listings.</p>
                        )}
                    </div>
                </div>

                <div className="section favourites">
                    <h1>Favourites</h1>
                    <div className="car-list">
                        {favouriteCars.length > 0 ? (
                            favouriteCars.map((car) => (
                                <CarCard 
                                    key={car._id} // Unique key for each car
                                    car={car} // Pass car data as a prop
                                    onClick={() => handleViewButtonClick(car._id)} // Pass click handler
                                />
                            ))
                        ) : (
                            <p>No cars found in your favourites.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
