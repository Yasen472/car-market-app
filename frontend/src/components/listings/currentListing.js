import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams hook
import { baseURL } from '../utils/constant.js';
import './currentListing.css'

const CurrentListing = () => {
  const { id } = useParams(); // Get the id parameter from the URL
  const [car, setCar] = useState([]);

  useEffect(() => {
    axios.get(`${baseURL}/get/${id}`)
      .then(response => {
        const carData = response.data;
        setCar(carData);
      })
      .catch(error => {
        // Handle error
        console.error('Error fetching data:', error);
      });
  }, [id]); // Include id in the dependency array

  return (
    <>
      {/* <div className="cards">
        <img src={car.image} className='listing-image' />
        <div className="card_details">
          <div className="name">{car.brand} {car.model}</div>
          <div className="underline" />
          <div className='car-details'>
            <div>Price: {car.price}</div>
            <div>Kilometres: {car.kilometres}</div>
            <div>Location: {car.location}</div>
          </div>
          <button className='view-btn'>View</button>
        </div>
      </div> */}

      <main>
      <div className="left-content">

        <div className="car-heading">
          {car.brand} {car.model}
        </div>
        <div className='main-info'>
          {car.year}, {car.coupe}, {car.type}, {car.fuelType}, {car.kilometres}, {car.transmission}, {car.euroStatus}, {car.engineCapacity}, {car.doorsCount} doors, {car.color}
        </div>
        <br></br>
        <div className='main-description'>
          {car.description}
        </div>
        <br></br>
        <div className='extras'>
          Комфорт: Климатик, Ел.стъкла, Ел.огледала, Стерео уредба, Алуминиеви джанти, Мултифункционален волан
          <br></br>
          Сигурност: ABS, ESP, Airbag, Халогенни фарове, ASR/Тракшън контрол, Аларма, Имобилайзер, Центр. заключване
          <br></br>
          Друго: Автопилот, Серво управление, Бордови компютър, Сервизна книжка
        </div>
        <br></br>
        <div>
          {car.publishedBy}
          {car.location}
          <br></br>
          Contact
          <br></br>
          {/* I have to update the contact */}
          0{car.contact}
        </div>
      </div>

      <div className="right-content">
        <img src={car.image} alt="Car" className="car-image" />
      </div>
      </main>
    </>
  );
}

export default CurrentListing;
