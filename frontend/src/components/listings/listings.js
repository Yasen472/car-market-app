// import React, { useEffect, useState, useContext } from "react";
// import "./listings.css";
// import Filters from "../filters/filters.js";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../auth/authContext.js";
// import { FilterContext } from "../context/FilterContext.js";
// import { PriceContext } from "../context/PriceContext.js";
// import { YearContext } from "../context/YearContext.js";
// import { PowerContext } from "../context/PowerContext.js";
// import { KilometresContext } from "../context/KilometresContext.js";
// import { FaFilter } from "react-icons/fa";
// import Loader from "../loader/loader.js";
// import CarCard from "../cards/carCard.js";

// function Listings() {
//     const [cars, setCars] = useState([]); // Paginated cars from backend
//     const [allCars, setAllCars] = useState([]); // All cars from backend
//     const [filteredCars, setFilteredCars] = useState([]); // Filtered cars after applying filters
//     const { selectedFilters } = useContext(FilterContext);
//     const { priceValues } = useContext(PriceContext);
//     const { yearValues } = useContext(YearContext);
//     const { powerValues } = useContext(PowerContext);
//     const { kilometresValues } = useContext(KilometresContext);
//     const [showFilters, setShowFilters] = useState(false);
//     const [page, setPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [loading, setLoading] = useState(false); // Add loading state
//     const { isLoggedIn, userId } = useAuth(); // Access isLoggedIn and userId

//     const carsPerPage = 10; // Adjust this to your preferred page size
//     const navigate = useNavigate();

//     // Fetch paginated and all cars from the backend
//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true); // Set loading to true before fetching data
//             try {
//                 // Fetch both paginated and all cars
//                 const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get/?page=${page}`);
//                 const carData = response.data.cars;
//                 const allCarsData = response.data.allCars; // Assuming this endpoint returns both paginated and all cars

//                 // Filter out cars if the user is logged in and exclude their own listings
//                 const filteredCarData = isLoggedIn 
//                     ? carData.filter((car) => car.ownerId !== userId)
//                     : carData;

//                 const filteredAllCarsData = isLoggedIn 
//                     ? allCarsData.filter((car) => car.ownerId !== userId)
//                     : allCarsData;

//                 setCars(filteredCarData);
//                 setAllCars(filteredAllCarsData);
//                 setTotalPages(response.data.totalPages);
//             } catch (error) {
//                 console.error("Error fetching car data:", error);
//                 setCars([]); // Handle error by setting empty cars array
//             } finally {
//                 setLoading(false); // Set loading to false after fetching
//             }
//         };
//         fetchData();
//     }, [page, isLoggedIn, userId]);

//     // Helper function to check if any filter is applied
//     const isAnyFilterApplied = () => {
//         return (
//             Object.values(selectedFilters).some(value => value) ||
//             priceValues[0] !== 0 || priceValues[1] !== 100000 || // Default price range check
//             yearValues[0] !== 1990 || yearValues[1] !== 2024 ||  // Default year range check
//             powerValues[0] !== 50 || powerValues[1] !== 500 ||     // Default power range check
//             kilometresValues[0] !== 50 || kilometresValues[1] !== 500      // Default kilometres range check
//         );
//     };

//     // Filter function to apply filters to the cars dataset
//     const filterCars = (carsToFilter) => {
//         return carsToFilter.filter((car) => {
//             // Apply the filters
//             for (const [key, value] of Object.entries(selectedFilters)) {
//                 if (!value) continue;

//                 if (key === "Make" && car.make !== value) return false;
//                 if (key === "Model" && car.model !== value) return false;
//                 if (key === "Fuel" && car.fuelType !== value) return false;
//                 if (key === "Transmission" && car.transmission !== value) return false;
//                 if (key === "Location" && car.location !== value) return false;
//                 if (key === "From" && car.from !== value) return false;
//                 if (key === "Color" && car.color.toLowerCase() !== value.toLowerCase()) return false;
//                 if (key === "DoorsCount" && car.doorsCount !== value) return false;
//                 if (key === "Coupe" && car.coupe.toLowerCase() !== value) return false;
//             }

//             // Range filters
//             if (car.price < priceValues[0] || car.price > priceValues[1]) return false;
//             if (car.year < yearValues[0] || car.year > yearValues[1]) return false;
//             if (car.power < powerValues[0] || car.power > powerValues[1]) return false;
//             if (car.kilometres < kilometresValues[0] || car.kilometres > kilometresValues[1]) return false;

//             return true;
//         });
//     };

//     // Effect to handle filtering and pagination of filtered cars
//     useEffect(() => {
//         if (isAnyFilterApplied()) {
//             setLoading(true); // Show loading spinner

//             // Apply filters to all cars
//             const filtered = filterCars(allCars);
//             setFilteredCars(filtered);

//             // Calculate new total pages based on the filtered cars
//             const newTotalPages = Math.ceil(filtered.length / carsPerPage);
//             setTotalPages(newTotalPages); // This triggers a re-render

//             // Ensure the current page is within the valid range
//             if (page > newTotalPages) {
//                 setPage(newTotalPages > 0 ? newTotalPages : 1); // Reset to the last page or page 1 if no pages
//             }

//             setLoading(false); // Hide loading spinner
//         }
//     }, [selectedFilters, priceValues, yearValues, powerValues, kilometresValues, allCars]);

//     // Get paginated cars based on whether filters are applied or not
//     const displayedCars = isAnyFilterApplied()
//         ? filteredCars.slice((page - 1) * carsPerPage, page * carsPerPage) // Paginate filtered cars
//         : cars; // Use backend-paginated cars if no filters are applied

//     const handleViewButtonClick = (carId) => {
//         navigate(`/currentListing/${carId}`);
//     };

//     const showNext = () => {
//         if (page < totalPages) {
//             setPage((prev) => prev + 1);
//         }
//     };

//     const showPrevious = () => {
//         if (page > 1) {
//             setPage((prev) => prev - 1);
//         }
//     };

//     const toggleFilters = () => {
//         setShowFilters(!showFilters);
//     };

//     return (
//         <div className="wrapper">
//             {loading && <Loader />} {/* Display Loader when loading is true */}
//             {!showFilters && !loading && (
//                 <div className="filter-icon">
//                     <FaFilter onClick={toggleFilters} />
//                 </div>
//             )}
//             {showFilters && !loading && (
//                 <div className="overlay">
//                     <div className="overlay-content">
//                         <Filters />
//                         <button className="close-filters-btn" onClick={toggleFilters}>Close</button>
//                     </div>
//                 </div>
//             )}
//             <div id="container" className={showFilters || loading ? "hidden" : ""}>
//                 {displayedCars.map((car) => (
//                     <CarCard 
//                         key={car._id} // Unique key for each car
//                         car={car} // Pass car data as a prop
//                         onClick={() => handleViewButtonClick(car._id)} // Pass click handler
//                     />
//                 ))}
//             </div>
//             {totalPages > 1 && !loading && (
//                 <div className="pagination-container">
//                     <div className="page-arrows-container">
//                         <p className={page === 1 ? "disabled" : ""} onClick={showPrevious}>&lt;</p>
//                         <div className="page-numbers">
//                             {[...Array(totalPages)].map((_, index) => (
//                                 <button
//                                     key={index + 1}
//                                     className={`page-button ${page === index + 1 ? "active" : ""}`}
//                                     onClick={() => setPage(index + 1)}
//                                 >
//                                     {index + 1}
//                                 </button>
//                             ))}
//                         </div>
//                         <p className={page === totalPages ? "disabled" : ""} onClick={showNext}>&gt;</p>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Listings;


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
    const [cars, setCars] = useState([]); // Paginated cars from backend
    const [allCars, setAllCars] = useState([]); // All cars from backend
    const [filteredCars, setFilteredCars] = useState([]); // Filtered cars after applying filters
    const { selectedFilters } = useContext(FilterContext);
    const { priceValues } = useContext(PriceContext);
    const { yearValues } = useContext(YearContext);
    const { powerValues } = useContext(PowerContext);
    const { kilometresValues } = useContext(KilometresContext);
    const [showFilters, setShowFilters] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false); // Add loading state
    const { isLoggedIn, userId } = useAuth(); // Access isLoggedIn and userId

    const carsPerPage = 10; // Adjust this to your preferred page size
    const navigate = useNavigate();

    // Fetch paginated and all cars from the backend
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Set loading to true before fetching data
            try {
                // Fetch both paginated and all cars
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get/?page=${page}`);
                const carData = response.data.cars;
                const allCarsData = response.data.allCars; // Assuming this endpoint returns both paginated and all cars

                // Filter out cars if the user is logged in and exclude their own listings
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
                setCars([]); // Handle error by setting empty cars array
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };
        fetchData();
    }, [page, isLoggedIn, userId]);

    // Helper function to check if any filter is applied
    const isAnyFilterApplied = () => {
        return (
            Object.values(selectedFilters).some(value => value) ||
            priceValues[0] !== 0 || priceValues[1] !== 100000 || // Default price range check
            yearValues[0] !== 1990 || yearValues[1] !== 2024 ||  // Default year range check
            powerValues[0] !== 50 || powerValues[1] !== 500 ||     // Default power range check
            kilometresValues[0] !== 50 || kilometresValues[1] !== 500      // Default kilometres range check
        );
    };

    // Filter function to apply filters to the cars dataset
    const filterCars = (carsToFilter) => {
        return carsToFilter.filter((car) => {
            // Apply the filters
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

            // Range filters
            if (car.price < priceValues[0] || car.price > priceValues[1]) return false;
            if (car.year < yearValues[0] || car.year > yearValues[1]) return false;
            if (car.power < powerValues[0] || car.power > powerValues[1]) return false;
            if (car.kilometres < kilometresValues[0] || car.kilometres > kilometresValues[1]) return false;

            return true;
        });
    };

    // Effect to handle filtering and pagination of filtered cars
    useEffect(() => {
        if (isAnyFilterApplied()) {
            setLoading(true); // Show loading spinner

            // Apply filters to all cars
            const filtered = filterCars(allCars);
            setFilteredCars(filtered);

            // Calculate new total pages based on the filtered cars
            const newTotalPages = Math.ceil(filtered.length / carsPerPage);
            setTotalPages(newTotalPages); // This triggers a re-render

            // Ensure the current page is within the valid range
            if (page > newTotalPages) {
                setPage(newTotalPages > 0 ? newTotalPages : 1); // Reset to the last page or page 1 if no pages
            }

            setLoading(false); // Hide loading spinner
        }
    }, [selectedFilters, priceValues, yearValues, powerValues, kilometresValues, allCars]);

    // Scroll to top when the page changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);

    // Get paginated cars based on whether filters are applied or not
    const displayedCars = isAnyFilterApplied()
        ? filteredCars.slice((page - 1) * carsPerPage, page * carsPerPage) // Paginate filtered cars
        : cars; // Use backend-paginated cars if no filters are applied

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
            {loading && <Loader />} {/* Display Loader when loading is true */}
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
            <div id="container" className={showFilters || loading ? "hidden" : ""}>
                {displayedCars.map((car) => (
                    <CarCard 
                        key={car._id} // Unique key for each car
                        car={car} // Pass car data as a prop
                        onClick={() => handleViewButtonClick(car._id)} // Pass click handler
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
