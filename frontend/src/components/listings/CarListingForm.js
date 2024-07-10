import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CarListingForm.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { baseURL } from '../utils/constant.js';
import { useAuth } from '../auth/authContext.js';

const CarListingForm = () => {
  const colors = ['White', 'Black', 'Silver', 'Gray', 'Blue', 'Red', 'Dark Blue', 'Dark Grey', 'Dark Red', 'Green'];
  const coupe = ['Sedan', 'Hatchback', 'Combie', 'Coupe', 'Cabrio', 'SUV', 'Van'];
  const transmission = ['manual', 'automatic'];
  const fuel = ['petrol', 'diesel', 'electric', 'hybrid'];
  const locations = ['Sofia', 'Varna', 'Plovdiv', 'Vraca', 'Burgas', 'Dupnica', 'Stara Zagora', 'Montana', 'Ruse', 'Haskovo', 'Pleven', 'Shumen', 'Sliven', 'Dobrich', 'Veliko Tarnovo', 'Pazardjik', 'Pernik', 'Gabrovo', 'Blagoevgrad', 'Kazanlak', 'Razgrad', 'Kustendil', 'Silistra', 'Troqn', 'Kurdjali', 'Targovishte', 'Dimitrovgrad', 'Vidin', 'Yambol', 'Petrich', 'Karnobat', 'Provadia', 'Velingrad', 'Gorna Orqhovica', 'Lovech'];
  const doorsCount = ['2/3', '4/5'];
  const condition = ['new', 'used'];
  const from = ['dealer', 'private seller', 'official distributor'];

  const { userId } = useAuth();

  const [models, setModels] = useState([]);
  const [makes, setMakes] = useState([]);

  const [images, setImages] = useState([]);
  const [car, setCar] = useState({
    year: '',
    type: '',
    fuelType: '',
    transmission: '',
    power: '',
    doorsCount: '',
    color: '',
    price: '',
    location: '',
    coupe: '',
    from: '',
    kilometres: '',
    engineCapacity: '',
    euroStatus: '',
    description: '',
    contact: '' // New contact field
  });
  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({
    year: '',
    type: '',
    fuelType: '',
    transmission: '',
    power: '',
    doorsCount: '',
    color: '',
    price: '',
    location: '',
    coupe: '',
    from: '',
    kilometres: '',
    engineCapacity: '',
    euroStatus: '',
    description: '',
    contact: '' // Error state for contact field
  });

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const base64Promises = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    });

    Promise.all(base64Promises)
      .then(base64Images => setImages(base64Images))
      .catch(error => console.error('Error uploading images:', error));
  };
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCar({ ...car, [name]: value });
    // Clear error message when user starts typing
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate all required fields including contact
    const errors = {};
    Object.keys(car).forEach(key => {
      if (!car[key] && key !== 'images') {
        errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });

    // Additional check for contact field
    if (!car.contact) {
      errors.contact = 'Contact information is required';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      let carData = {
        make: car.make,
        model: car.model,
        year: car.year,
        type: car.type,
        fuelType: car.fuelType,
        transmission: car.transmission,
        power: car.power,
        doorsCount: car.doorsCount,
        color: car.color,
        price: car.price,
        coupe: car.coupe,
        from: car.from,
        kilometres: car.kilometres,
        engineCapacity: car.engineCapacity,
        euroStatus: car.euroStatus,
        description: car.description,
        contact: car.contact, // Add contact to carData
        location: car.location,
        ownerId: userId,
        images: images,  // Append the base64 images array,
      };

      console.log(carData);

      await axios.post(`${baseURL}/save`, carData, {
        headers: {
          'Content-Type': 'application/json' // Set content type to application/json
        }
      });

      setSubmitted(true);
      console.log('Success');
    } catch (error) {
      console.error('Error saving car:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/get/models`);
        const carData = response.data;
        const makes = new Set(
          carData
            .map((car) => car.make)
            .sort((a, b) => a.localeCompare(b))
        );
        setMakes(Array.from(makes));
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        if (car.make) {
          const response = await axios.get(`${baseURL}/get/models`, {
            params: { make: car.make }
          });
          const modelsData = response.data
            .filter((el) => el.make === car.make)
            .map((el) => el.model);
          setModels(modelsData);
        } else {
          setModels([]);
        }
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };

    fetchModels();
  }, [car.make]);

  return (
    <div className="car-listing-form">
      <Carousel showThumbs={false} showArrows={false}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </Carousel>
      <h1>Create Car Listing</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Upload Images:</label>
          <input type="file" multiple onChange={handleImageUpload} />
        </div>
        <div className="error-message">{formErrors.year}</div>
        <div>
          <label>Brand:</label>
          <select className="car-select" name="make" value={car.make} onChange={handleInputChange}>
            <option value="">Select a brand</option>
            {makes.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="error-message">{formErrors.model}</div>
        <div>
          <label>Model:</label>
          <select className="car-select" name="model" value={car.model} onChange={handleInputChange}>
            <option value="">Select a model</option>
            {models.map((model) => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>
        <div className="error-message">{formErrors.year}</div>
        <div>
          <label>Year:</label>
          <input type="text" name="year" value={car.year} onChange={handleInputChange} />
          <div className="error-message">{formErrors.year}</div>
        </div>
        <div className="error-message">{formErrors.type}</div>
        <div>
          <label>Condition:</label>
          <select className="car-select" name="type" value={car.type} onChange={handleInputChange}>
            <option value="">Select a condition</option>
            {condition.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="error-message">{formErrors.fuelType}</div>
        <div>
          <label>Fuel type:</label>
          <select className="car-select" name="fuelType" value={car.fuelType} onChange={handleInputChange}>
            <option value="">Select a fuel type</option>
            {fuel.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="error-message">{formErrors.transmission}</div>
        <div>
          <label>Transmission:</label>
          <select className="car-select" name="transmission" value={car.transmission} onChange={handleInputChange}>
            <option value="">Select a transmission</option>
            {transmission.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="error-message">{formErrors.power}</div>
        <div>
          <label>Power (hp):</label>
          <input type="text" name="power" value={car.power} onChange={handleInputChange} />
        </div>
        <div className="error-message">{formErrors.doorsCount}</div>
        <div>
          <label>Number of doors:</label>
          <select className="car-select" name="doorsCount" value={car.doorsCount} onChange={handleInputChange}>
            <option value="">Select number of doors</option>
            {doorsCount.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="error-message">{formErrors.color}</div>
        <div>
          <label>Color:</label>
          <select className="car-select" name="color" value={car.color} onChange={handleInputChange}>
            <option value="">Select a color</option>
            {colors.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="error-message">{formErrors.price}</div>
        <div>
          <label>Price (lv.):</label>
          <input type="text" name="price" value={car.price} onChange={handleInputChange} />
        </div>
        <div className="error-message">{formErrors.location}</div>
        <div>
          <label>Location:</label>
          <select className="car-select" name="location" value={car.location} onChange={handleInputChange}>
            <option value="">Select a location</option>
            {locations.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="error-message">{formErrors.coupe}</div>
        <div>
          <label>Type of coupe:</label>
          <select className="car-select" name="coupe" value={car.coupe} onChange={handleInputChange}>
            <option value="">Select a type of coupe</option>
            {coupe.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="error-message">{formErrors.from}</div>
        <div>
          <label>From:</label>
          <select className="car-select" name="from" value={car.from} onChange={handleInputChange}>
            <option value="">Select where the car is from</option>
            {from.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="error-message">{formErrors.kilometres}</div>
        <div>
          <label>Kilometres:</label>
          <input type="text" name="kilometres" value={car.kilometres} onChange={handleInputChange} />
        </div>
        <div className="error-message">{formErrors.engineCapacity}</div>
        <div>
          <label>Engine Capacity:</label>
          <input type="text" name="engineCapacity" value={car.engineCapacity} onChange={handleInputChange} />
        </div>
        <div className="error-message">{formErrors.euroStatus}</div>
        <div>
          <label>Euro Status:</label>
          <input type="text" name="euroStatus" value={car.euroStatus} onChange={handleInputChange} />
        </div>
        <div className="error-message">{formErrors.contact}</div>
        <div>
          <label>Contact:</label>
          <input type="text" name="contact" value={car.contact} onChange={handleInputChange} />
        </div>
        <div className="error-message">{formErrors.description}</div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={car.description} onChange={handleInputChange}></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
      {submitted && <p>Car listing submitted successfully!</p>}
    </div>
  );
};

export default CarListingForm;
