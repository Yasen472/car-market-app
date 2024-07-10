import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { baseURL } from "../utils/constant.js";
import { useAuth } from "../auth/authContext.js";
import "./currentListing.css";
import { CiSquareRemove } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import CarouselListing from "../carousel/carouselListing.js";

const CurrentListing = () => {
    const { id } = useParams();
    const [car, setCar] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedCar, setEditedCar] = useState({});
    const { isLoggedIn, userId } = useAuth(); // Assuming you have access to userId in useAuth

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${baseURL}/get/${id}`)
            .then((response) => {
                const carData = response.data;
                delete carData.__v;
                setCar(carData);
                setEditedCar(carData);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedCar({ ...editedCar, [name]: value });
    };

    const handleSave = () => {
        axios
            .put(`${baseURL}/update/${id}`, editedCar)
            .then((response) => {
                setCar(editedCar);
                setIsEditing(false);
            })
            .catch((error) => {
                console.error("Error saving data:", error);
            });
    };

    const handleDelete = () => {
        axios.delete(`${baseURL}/delete/${id}`)
            .then(() => {console.log(`Deleted successfully!`); navigate('/')})
            .catch((err) => {console.error(`Error deleting data`, err)})
    }

    // Check if the current user owns this listing
    const isOwner = car.ownerId === userId;

    return (
        <main className="main-container">
            <div className="content-container">
                <div className="left-content">
                    <h1 className="header">
                        {car.make} {car.model}
                    </h1>
                    <div className="car-info">
                        {Object.keys(car).map((key) => {
                            if (key !== "images" && key !== "_id" && key !== "publishedBy" && key !== "contact" && key !== "description" && key !== "ownerId") {
                                return (
                                    <p key={key}>
                                        {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name={key}
                                                value={editedCar[key]}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            car[key]
                                        )}
                                    </p>
                                );
                            }
                            return null;
                        })}
                        <p>Description:</p>
                        {/* Description without text area */}
                        {isEditing ? (
                            <textarea name="description" value={editedCar.description} onChange={handleInputChange} />
                        ) : (
                            <p className="p-description">{car.description}</p>
                        )}
                        {/* Edit and Save buttons */}
                        {isLoggedIn && isOwner && (
                            <div className="edit-save-buttons">
                                {isEditing ? (
                                    <button className="save-button" onClick={handleSave}>
                                        Save
                                    </button>
                                ) : (
                                    <button className="edit-button" onClick={() => setIsEditing(true)}>
                                        Edit
                                    </button>
                                )}
                                <button className="remove-button" onClick={handleDelete}>Remove</button>
                            </div>
                        )}
                    </div>
                    <div className="contact-info">
                        <h2>Contact</h2>
                        <div>{car.publishedBy}</div>
                        <svg
                            width="800px"
                            height="800px"
                            viewBox="-7 0 32 32"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs></defs>
                            <g
                                id="Page-1"
                                stroke="none"
                                strokeWidth="1"
                                fill="none"
                                fillRule="evenodd"
                            >
                                <g
                                    id="Icon-Set"
                                    transform="translate(-471.000000, -463.000000)"
                                    fill="#000000"
                                >
                                    <path
                                        d="M487,468 L473,468 L473,467 C473,465.896 473.896,465 475,465 L485,465 C486.104,465 487,465.896 487,467 L487,468 L487,468 Z M473,470 L487,470 L487,483 L473,483 L473,470 Z M487,491 C487,492.104 486.104,493 485,493 L475,493 C473.896,493 473,492.104 473,491 L473,485 L487,485 L487,491 L487,491 Z M485,463 L475,463 C472.791,463 471,464.791 471,467 L471,491 C471,493.209 472.791,495 475,495 L485,495 C487.209,495 489,493.209 489,491 L489,467 C489,464.791 487.209,463 485,463 L485,463 Z M480,491 C481.104,491 482,490.104 482,489 C482,487.896 481.104,487 480,487 C478.896,487 478,487.896 478,489 C478,490.104 478.896,491 480,491 L480,491 Z"
                                        id="smartphone"
                                    ></path>
                                </g>
                            </g>
                        </svg>
                        <div>{car.contact}</div>
                    </div>
                </div>
                <div className="right-content">
                    <CarouselListing images={car.images} />
                </div>
            </div>
        </main>
    );
};

export default CurrentListing;