import React, { useEffect, useState, useContext } from "react";
import "./listings.css";
import Filters from "../filters/filters.js";
import axios from "axios";
import { baseURL } from "../utils/constant.js";
import { useNavigate } from "react-router-dom";
import { FilterContext } from "../context/FilterContext.js";
import CustomCarousel from "../carousel/customCarousel.js";
import { PriceContext } from "../context/PriceContext.js";
import { YearContext } from "../context/YearContext.js";
import { PowerContext } from "../context/PowerContext.js";
import { FaFilter } from "react-icons/fa";

function Listings() {
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();
    const { selectedFilters } = useContext(FilterContext);
    const { priceValues } = useContext(PriceContext);
    const { yearValues } = useContext(YearContext);
    const { powerValues } = useContext(PowerContext);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseURL}/get`);
                const carData = response.data;
                setCars(carData);
            } catch (error) {
                console.error("Error fetching car data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        filterCars(cars);
    }, [selectedFilters, priceValues, yearValues, powerValues]);


    const handleViewButtonClick = (carId) => {
        navigate(`/currentListing/${carId}`);
    };

    const filterCars = (cars) => {
        return cars.filter((car) => {
            return Object.entries(selectedFilters).every(([key, value]) => {
                if (key === "Make") return car.make === value;
                if (key === "Model") return car.model === value;
                if (key === "Fuel") return car.fuelType === value;
                if (key === "Transmission") return car.transmission === value;
                if (key === "Location") return car.location === value;
                if (key === "From") return car.from === value;
                if (key === "Color") return car.color.toLowerCase() === value.toLowerCase();
                if (key === "DoorsCount") return car.doorsCount === value;
                return true;
            });
        }).filter((car) => car.price >= priceValues[0] && car.price <= priceValues[1] && car.year >= yearValues[0] && car.year <= yearValues[1] && car.power >= powerValues[0] && car.power <= powerValues[1]);
    };

    const filteredCars = filterCars(cars);

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    return (
        <div className="wrapper">
                <div className="filter-icon">
                    <FaFilter onClick={toggleFilters}/>
                </div>
            {showFilters && (
                <div className="overlay">
                    <div className="overlay-content">
                        <Filters />
                        <button className="close-filters-btn" onClick={toggleFilters}>Close</button>
                    </div>
                </div>
            )}
            <div id="container" className={showFilters ? "hidden" : ""}>
                {filteredCars.map((car, index) => {
                    return (
                        <div className="cards" key={index}>
                            <CustomCarousel images={car.images} />
                            <div className="card_details">
                                <div className="name">
                                    {car.make} {car.model}
                                </div>
                                <div className="car-details">
                                    <div>Price: {car.price}</div>
                                    <div>Kilometres: {car.kilometres}</div>
                                    <div>Location: {car.location}</div>
                                </div>
                                <button
                                    onClick={() => handleViewButtonClick(car._id)}
                                    className="view-btn"
                                >
                                    View
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Listings;
