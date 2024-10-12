// import React from 'react';
// import { MdLocationOn } from "react-icons/md"; // location
// import { BsFillFuelPumpFill } from "react-icons/bs"; // fuel
// import { SlSpeedometer } from "react-icons/sl"; // kilometres
// import TransmissionImage from '../images/gearbox.jpg'; // Transmission image
// import { TbEngine } from "react-icons/tb"; // engine capacity
// import { GiCarDoor } from "react-icons/gi"; // doorsCount
// import { LuArrowUpRight } from "react-icons/lu"; // arrow icon
// import "./carCard.css"

// const CarCard = ({ car, onClick }) => {

//     // Utility function to format kilometres
//     const formatKilometres = (kilometres) => {
//         if (kilometres >= 1000) {
//             return `${(kilometres / 1000).toFixed(0)}k`; // Format to '100k'
//         }
//         return kilometres; // Return original value if less than 1000
//     };

//     return (
//         <div className="card" onClick={onClick}>
//             <div className="image-container">
//                 <img src={car.images[0]} className="car-image" alt={`${car.make} ${car.model}`} />
//                 <div className="bottom-right-overlay">
//                     <span className="overlay-text">{car.price} lv.</span>
//                 </div>
//             </div>
//             <div className="card_details">
//                 <div className="name-header">
//                     {car.make} {car.model}
//                 </div>
//                 <div className="car-details">
//                     <div className="icon-container">
//                         <MdLocationOn />
//                         <span>{car.location}</span>
//                     </div>
//                     <div className="icon-container">
//                         <BsFillFuelPumpFill />
//                         <span>{car.fuelType}</span>
//                     </div>
//                     <div className="icon-container">
//                         <SlSpeedometer />
//                         <span>{formatKilometres(car.kilometres)} km</span>
//                     </div>
//                     <div className="icon-container">
//                         <TbEngine />
//                         <span>{car.power} hp</span>
//                     </div>
//                     <div className="icon-container">
//                         <img src={TransmissionImage} alt="Transmission" className="transmission-image" />
//                         <span>{car.transmission}</span>
//                     </div>
//                     <div className="icon-container">
//                         <GiCarDoor />
//                         <span>{car.doorsCount}</span>
//                     </div>
//                 </div>
//                 <div className="enter-icon-container" onClick={onClick}>
//                     <LuArrowUpRight className="enter-icon" />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CarCard;

import React from 'react';
import { MdLocationOn } from "react-icons/md"; // location
import { BsFillFuelPumpFill } from "react-icons/bs"; // fuel
import { SlSpeedometer } from "react-icons/sl"; // kilometres
import TransmissionImage from '../images/gearbox.jpg'; // Transmission image
import { TbEngine } from "react-icons/tb"; // engine capacity
import { GiCarDoor } from "react-icons/gi"; // doorsCount
import { LuArrowUpRight } from "react-icons/lu"; // arrow icon
import "./carCard.css"

const CarCard = ({ car, onClick }) => {

    // Utility function to format kilometres
    const formatKilometres = (kilometres) => {
        if (kilometres >= 1000) {
            return `${(kilometres / 1000).toFixed(0)}k`; // Format to '100k'
        }
        return kilometres; // Return original value if less than 1000
    };

    return (
        <div className="card" onClick={onClick}>
            <div className="image-container">
                <img src={car.images[0]} className="car-image" alt={`${car.make} ${car.model}`} />
                <div className="bottom-right-overlay">
                    <span className="overlay-text">{car.price} lv.</span>
                </div>
            </div>
            <div className="card_details">
                <div className="name-header">
                    {car.make} {car.model}
                </div>
                <div className="car-details">
                    <div className="icon-container">
                        <MdLocationOn />
                        <span>{car.location}</span>
                    </div>
                    <div className="icon-container">
                        <BsFillFuelPumpFill />
                        <span>{car.fuelType}</span>
                    </div>
                    <div className="icon-container">
                        <SlSpeedometer />
                        <span>{formatKilometres(car.kilometres)} km</span>
                    </div>
                    <div className="icon-container">
                        <TbEngine />
                        <span>{car.power} hp</span>
                    </div>
                    <div className="icon-container">
                        <img src={TransmissionImage} alt="Transmission" className="transmission-image" />
                        <span>{car.transmission}</span>
                    </div>
                    <div className="icon-container">
                        <GiCarDoor />
                        <span>{car.doorsCount}</span>
                    </div>
                </div>
                <div className="enter-icon-container" onClick={onClick}>
                    <LuArrowUpRight className="enter-icon" />
                </div>
            </div>
        </div>
    );
};

export default CarCard;


