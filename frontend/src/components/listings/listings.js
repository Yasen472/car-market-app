import React, { useEffect, useState, useContext } from "react";
import "./listings.css";
import Filters from "../filters/filters.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext.js";
import { FilterContext } from "../context/FilterContext.js";
import { PriceContext } from "../context/PriceContext.js";
import { YearContext } from "../context/YearContext.js";
import { PowerContext } from "../context/PowerContext.js";
import { KilometresContext } from "../context/KilometresContext.js";
import { FaFilter } from "react-icons/fa";
import Loader from "../loader/loader.js";
import CarCard from "../cards/carCard.js";

function Listings() {
    const [cars, setCars] = useState([]);
    const [allCars, setAllCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const { selectedFilters } = useContext(FilterContext);
    const { priceValues } = useContext(PriceContext);
    const { yearValues } = useContext(YearContext);
    const { powerValues } = useContext(PowerContext);
    const { kilometresValues } = useContext(KilometresContext);
    const [showFilters, setShowFilters] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    const { isLoggedIn, userId } = useAuth();

    const carsPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get/?page=${page}`);
                const carData = response.data.cars;
                const allCarsData = response.data.allCars;

                const filteredCarData = isLoggedIn
                    ? carData.filter((car) => car.ownerId !== userId)
                    : carData;

                const filteredAllCarsData = isLoggedIn
                    ? allCarsData.filter((car) => car.ownerId !== userId)
                    : allCarsData;

                setCars(filteredCarData);
                setAllCars(filteredAllCarsData);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("Error fetching car data:", error);
                setCars([]);
            } finally {
                setLoading(false);
                setInitialLoad(false);
            }
        };
        fetchData();
    }, [page, isLoggedIn, userId]);

    const isAnyFilterApplied = () => {
        return (
            Object.values(selectedFilters).some(value => value) ||
            priceValues[0] !== 0 || priceValues[1] !== 100000 ||
            yearValues[0] !== 1990 || yearValues[1] !== 2024 ||
            powerValues[0] !== 50 || powerValues[1] !== 500 ||
            kilometresValues[0] !== 50 || kilometresValues[1] !== 500
        );
    };

    const filterCars = (carsToFilter) => {
        return carsToFilter.filter((car) => {
            for (const [key, value] of Object.entries(selectedFilters)) {
                if (!value) continue;

                if (key === "Make" && car.make !== value) return false;
                if (key === "Model" && car.model !== value) return false;
                if (key === "Fuel" && car.fuelType !== value) return false;
                if (key === "Transmission" && car.transmission !== value) return false;
                if (key === "Location" && car.location !== value) return false;
                if (key === "From" && car.from !== value) return false;
                if (key === "Color" && car.color.toLowerCase() !== value.toLowerCase()) return false;
                if (key === "DoorsCount" && car.doorsCount !== value) return false;
                if (key === "Coupe" && car.coupe.toLowerCase() !== value) return false;
            }

            if (car.price < priceValues[0] || car.price > priceValues[1]) return false;
            if (car.year < yearValues[0] || car.year > yearValues[1]) return false;
            if (car.power < powerValues[0] || car.power > powerValues[1]) return false;
            if (car.kilometres < kilometresValues[0] || car.kilometres > kilometresValues[1]) return false;

            return true;
        });
    };

    useEffect(() => {
        setLoading(true);
        if (isAnyFilterApplied()) {
            const filtered = filterCars(allCars);
            setFilteredCars(filtered);

            const newTotalPages = Math.ceil(filtered.length / carsPerPage);
            setTotalPages(newTotalPages);

            if (page > newTotalPages) {
                setPage(newTotalPages > 0 ? newTotalPages : 1);
            }
        } else {
            setFilteredCars([]);
            setTotalPages(Math.ceil(cars.length / carsPerPage));
        }
        setLoading(false);
    }, [selectedFilters, priceValues, yearValues, powerValues, kilometresValues, allCars]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);

    const displayedCars = isAnyFilterApplied()
        ? filteredCars.slice((page - 1) * carsPerPage, page * carsPerPage)
        : cars;

    const handleViewButtonClick = (carId) => {
        navigate(`/currentListing/${carId}`);
    };

    const showNext = () => {
        if (page < totalPages) {
            setPage((prev) => prev + 1);
        }
    };

    const showPrevious = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    return (
        <div className="wrapper">
            {loading && <Loader />}
            {!showFilters && !loading && (
                <div className="filter-icon">
                    <FaFilter onClick={toggleFilters} />
                </div>
            )}
            {showFilters && !loading && (
                <div className="overlay">
                    <div className="overlay-content">
                        <Filters />
                        <button className="close-filters-btn" onClick={toggleFilters}>Close</button>
                    </div>
                </div>
            )}
            <div
                id="container"
                className={`${showFilters || loading ? "hidden" : ""} ${!loading && !initialLoad && displayedCars.length === 0 ? "no-listings" : ""}`}
            >
                {!loading && !initialLoad && displayedCars.length === 0 && (
                    <div className="no-listings-message">
                        <p>No listings found based on the selected filters.</p>
                    </div>
                )}
                {displayedCars.map((car) => (
                    <CarCard
                        key={car._id}
                        car={car}
                        onClick={() => handleViewButtonClick(car._id)}
                    />
                ))}
            </div>

            {totalPages > 1 && !loading && (
                <div className="pagination-container">
                    <div className="page-arrows-container">
                        <p className={page === 1 ? "disabled" : ""} onClick={showPrevious}>&lt;</p>
                        <div className="page-numbers">
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index + 1}
                                    className={`page-button ${page === index + 1 ? "active" : ""}`}
                                    onClick={() => setPage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                        <p className={page === totalPages ? "disabled" : ""} onClick={showNext}>&gt;</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Listings;
