import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/authContext.js";
import "./currentListing.css";
import { useNavigate } from "react-router-dom";
import CarouselListing from "../carousel/carouselListing.js";
import { CiHeart } from "react-icons/ci"; 
import { FaHeart } from "react-icons/fa"; 
import { MdLocationOn } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi"; 
import { IoMdPerson } from "react-icons/io"; 
import { AiOutlineShareAlt } from "react-icons/ai";
import { FaTools } from "react-icons/fa";
import { PiBookOpenTextLight } from "react-icons/pi";
import { FaPhone } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa"; 
import { MdDeleteForever } from "react-icons/md";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { SlSpeedometer } from "react-icons/sl"; 

const CurrentListing = () => {
    const { id } = useParams();
    const [car, setCar] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedCar, setEditedCar] = useState({});
    const { isLoggedIn, userId } = useAuth();
    const [isBookmarked, setIsBookmarked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/get/${id}`)
            .then((response) => {
                const carData = response.data;
                delete carData.__v;
                setCar(carData);
                setEditedCar(carData);
                if (carData.bookmarkedBy && carData.bookmarkedBy.includes(userId)) {
                    setIsBookmarked(true);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [id, userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedCar({ ...editedCar, [name]: value });
    };

    const handleSave = () => {
        axios
            .put(`${process.env.REACT_APP_BASE_URL}/update/${id}`, editedCar)
            .then(() => {
                setCar(editedCar);
                setIsEditing(false);
            })
            .catch((error) => {
                console.error("Error saving data:", error);
            });
    };

    const handleDelete = () => {
        axios
            .delete(`${process.env.REACT_APP_BASE_URL}/delete/${id}`)
            .then(() => { console.log(`Deleted successfully!`); navigate('/') })
            .catch((err) => { console.error(`Error deleting data`, err) })
    }

    const handleBookmarkToggle = () => {
        const updatedBookmarkedBy = isBookmarked
            ? car.bookmarkedBy.filter(id => id !== userId)
            : [...car.bookmarkedBy, userId];

        axios
            .put(`${process.env.REACT_APP_BASE_URL}/update/${id}`, { bookmarkedBy: updatedBookmarkedBy })
            .then(() => {
                setCar(prevCar => ({ ...prevCar, bookmarkedBy: updatedBookmarkedBy }));
                setIsBookmarked(!isBookmarked);
            })
            .catch((error) => {
                console.error("Error updating bookmark:", error);
            });
    };

    const isOwner = car.ownerId === userId;

    const handleShare = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: `${car.make} ${car.model} for sale`,
                    text: `${car.make} ${car.model} available at ${car.location} for ${car.price} lv.`,
                    url: window.location.href
                })
                .then(() => console.log("Successfully shared"))
                .catch((error) => console.error("Error sharing:", error));
        } else {
            alert("Web Share API is not supported in your browser.");
        }
    };

    return (
        <main className="main-container">
            <div className="main-content-container">
                <div className="content-container">
                    <div className="left-content">
                        <div className="carousel-container">
                            <CarouselListing images={car.images} />
                            {isLoggedIn && !isOwner && (
                                <span className="bookmark-icon" onClick={handleBookmarkToggle}>
                                    {isBookmarked ? <FaHeart color="red" /> : <CiHeart />}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="right-content">
                        <h1 className="listing-header">
                            {isEditing ? (
                                <input
                                    className="editable-input"
                                    type="text"
                                    name="make"
                                    value={editedCar.make}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                car.make
                            )}{" "}
                            {isEditing ? (
                                <input
                                    className="editable-input"
                                    type="text"
                                    name="model"
                                    value={editedCar.model}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                car.model
                            )}
                        </h1>

                        <div className="icon-item">
                            <MdLocationOn color="#007bff" />
                            {isEditing ? (
                                <input
                                    className="editable-input"
                                    type="text"
                                    name="location"
                                    value={editedCar.location}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <span>{car.location}</span>
                            )}
                        </div>

                        <hr />

                        <div className="icon-item-price">
                            <GiMoneyStack color="green" />
                            {isEditing ? (
                                <input
                                    className="editable-input"
                                    type="text"
                                    name="price"
                                    value={editedCar.price}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <span>{car.price} lv.</span>
                            )}
                        </div>
                        

                        <div className="icon-item">
                            <SlSpeedometer />
                            {isEditing ? (
                                <input
                                    className="editable-input"
                                    type="text"
                                    name="price"
                                    value={editedCar.kilometres}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <span>{car.kilometres} km.</span>
                            )}
                        </div>

                        <div className="icon-item">
                            <IoMdPerson color="#007bff" />
                            {isEditing ? (
                                <input
                                    className="editable-input"
                                    type="text"
                                    name="from"
                                    value={editedCar.from}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <span>{car.from}</span>
                            )}
                        </div>
                        <div className="icon-item">
                            <BsFillFuelPumpFill />
                            {isEditing ? (
                                <input
                                    className="editable-input"
                                    type="text"
                                    name="from"
                                    value={editedCar.fuelType}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <span>{car.fuelType}</span>
                            )}
                        </div>

                        <div className="contact-share-buttons">
                            <button className="contact-button">
                                <FaPhone /> {car.contact}
                            </button>

                            {navigator.share && (
                                <button className="share-button" onClick={handleShare}>
                                    <AiOutlineShareAlt /> Share
                                </button>
                            )}
                        </div>

                        {isLoggedIn && isOwner && (
                            <div className="edit-save-container">
                                {isEditing ? (
                                    <button className="save-button" onClick={handleSave}>
                                        Save
                                    </button>
                                ) : (
                                    <div className="edit-container">
                                        Edit
                                        <FaEdit className="edit-icon" onClick={() => setIsEditing(true)} />
                                    </div>
                                )}
                                Delete
                                <MdDeleteForever className="delete-icon" onClick={handleDelete} />
                            </div>
                        )}

                    </div>
                </div>

                <div className="specs-container">
                    <div className="specs-header-column">
                        <FaTools color="#007bff" />
                        <h4 className="specs-header">Specifications</h4>
                    </div>
                    <div className="categories-container">
                        <span>Make:</span>
                        <span>Model:</span>
                        <span>Color:</span>
                        <span>Price:</span>
                        <span>Power:</span>
                        <span>Year:</span>
                        <span>Coupe:</span>
                        <span>Engine Capacity:</span>
                        <span>Euro Status:</span>
                        <span>Doors:</span>
                        <span>Transmission:</span>
                        <span>From:</span>
                        <span>FuelType:</span>
                        <span>Kilometres:</span>
                        <span>Location:</span>
                    </div>
                    <div className="specs-values-container">
                        {isEditing ? (
                            <>
                                <input className="editable-input" type="text" name="make" value={editedCar.make} onChange={handleInputChange} />
                                <input className="editable-input" type="text" name="model" value={editedCar.model} onChange={handleInputChange} />
                                <input className="editable-input" type="text" name="color" value={editedCar.color} onChange={handleInputChange} />
                                <input className="editable-input" type="text" name="power" value={editedCar.power} onChange={handleInputChange} />
                                <input className="editable-input" type="text" name="year" value={editedCar.year} onChange={handleInputChange} />
                                <input className="editable-input" type="text" name="coupe" value={editedCar.coupe} onChange={handleInputChange} />
                                <input className="editable-input" type="text" name="engineCapacity" value={editedCar.engineCapacity} onChange={handleInputChange} />
                                <input className="editable-input" type="text" name="euroStatus" value={editedCar.euroStatus} onChange={handleInputChange} />
                                <input className="editable-input" type="text" name="doorsCount" value={editedCar.doorsCount} onChange={handleInputChange} />
                                <input className="editable-input" type="text" name="transmission" value={editedCar.transmission} onChange={handleInputChange} />
                                <input className="editable-input" type="text" name="from" value={editedCar.from} onChange={handleInputChange} />
                                <input className="editable-input" type="text" name="fuelType" value={editedCar.fuelType} onChange={handleInputChange} />
                                <input className="editable-input" type="text" name="kilometres" value={editedCar.kilometres} onChange={handleInputChange} />
                                <input className="editable-input" type="text" name="location" value={editedCar.location} onChange={handleInputChange} />
                            </>
                        ) : (
                            <>
                                <span>{car.make}</span>
                                <span>{car.model}</span>
                                <span>{car.color}</span>
                                <span>{car.price} lv.</span>
                                <span>{car.power} hp</span>
                                <span>{car.year}</span>
                                <span>{car.coupe}</span>
                                <span>{car.engineCapacity} cm³</span>
                                <span>{car.euroStatus}</span>
                                <span>{car.doorsCount}</span>
                                <span>{car.transmission}</span>
                                <span>{car.from}</span>
                                <span>{car.fuelType}</span>
                                <span>{car.kilometres}</span>
                                <span>{car.location}</span>
                            </>
                        )}
                    </div>
                </div>

                <div className="description-container">
                    <div className="description-header">
                        <PiBookOpenTextLight color="#007bff" />
                        <h4>Description</h4>
                    </div>
                    {isEditing ? (
                        <textarea
                            className="editable-textarea"
                            name="description"
                            value={editedCar.description}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <p className="p-description">{car.description}</p>
                    )}
                </div>
            </div>
        </main>
    );
};

export default CurrentListing;



