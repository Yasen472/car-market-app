import React, { useEffect, useState } from 'react';
import './filters.css';
import SliderPrice from './sliderPrice.js';
import SliderPower from './sliderPower.js';
import SliderYear from './sliderYear.js';
import { baseURL } from '../utils/constant.js';
import axios from 'axios';

const Filters = () => {
  const [selected, setSelected] = useState('');
  const [make, setMake] = useState([]);
  const [model, setModel] = useState([]);
  const [options, setOptions] = useState([]);

  const colors = ['White', 'Black', 'Silver', 'Gray', 'Blue', 'Red', 'Dark Blue', 'Dark Grey', 'Dark Red', 'Green'];
  const coupe = ['Sedan', 'Hatchback', 'Combie', 'Coupe', 'Cabrio', 'SUV', 'Van'];
  const transmission = ['manual', 'automatic'];
  const fuel = ['petrol', 'diesel', 'electric', 'hybrid'];
  const locations = ['Sofia',
    'Varna',
    'Plovdiv',
    'Vraca',
    'Burgas',
    'Dupnica',
    'Stara Zagora',
    'Montana',
    'Ruse',
    'Haskovo',
    'Pleven',
    'Shumen',
    'Sliven',
    'Dobrich',
    'Veliko Tarnovo',
    'Pazardjik',
    'Pernik',
    'Gabrovo',
    'Blagoevgrad',
    'Kazanlak',
    'Razgrad',
    'Kustendil',
    'Silistra',
    'Troqn',
    'Kurdjali',
    'Targovishte',
    'Dimitrovgrad',
    'Vidin',
    'Yambol',
    'Petrich',
    'Karnobat',
    'Provadia',
    'Velingrad',
    'Gorna Orqhovica',
    'Lovech'
  ];

  const publishedBy = ['Private Seller', 'Dealer', 'Official Distributor'];
  const doorsCount = ['2/3', '4/5'];
  const wheelPosition = ['left', 'right'];

  //I will have to make extras variable containing all of the extras that the user can choose from
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get(`${baseURL}/get/models`);
        const makes = new Set(response.data.map(car => car.make)
          .sort((a, b) => a.localeCompare(b)));
        const models = new Set(response.data.map(car => car.model)
          .sort((a, b) => a.localeCompare(b)));
        setMake(makes);
        setModel(models);
      } catch (error) {
        debugger;
        console.error('Error fetching models:', error);
      }
    };

    fetchModels();
  }, []);

  console.log(make);
  console.log(model);


  useEffect(() => {
    if (selected) {
      console.log('selected is now equal to true...')
    }
  }, [selected])

  return (

    <>

      <div className="filters-container">
        <div onClick={() => { setSelected('Make'); setOptions(make) }}>Make</div>
        <div onClick={() => { setSelected('Model'); setOptions(model) }}>Model</div>
        <div onClick={() => { setSelected('Fuel'); setOptions(fuel) }}>Fuel type</div>
        <div onClick={() => { setSelected('Transmission'); setOptions(transmission) }}>Transmission Type</div>
        <div onClick={() => setSelected('Price')}>Price</div>
        <div onClick={() => setSelected('Year')}>Year</div>
        <div onClick={() => { setSelected('Location'); setOptions(locations) }}>Location</div>
        <div onClick={() => { setSelected('From'); setOptions(publishedBy) }}>From</div>
        <div onClick={() => { setSelected('Color'); setOptions(colors) }}>Color</div>
        <div onClick={() => { setSelected('DoorsCount'); setOptions(doorsCount) }}>DoorsCount</div>
        <div onClick={() => { setSelected('Power') }}>Power</div>
        <div onClick={() => setSelected('Extras')}>Extras</div>
      </div>

      <div className="menu-container">
        <div className="header">
          <h2>{selected}</h2>
        </div>
        <div className="options-container">
          {(selected === 'Make' || selected === 'Model' || selected === 'Fuel' || selected === 'Transmission' || selected === 'Location' || selected === 'From' || selected === 'Color' || selected === 'DoorsCount') &&
            Array.from(options).map(option => (
              <div key={option}>{option}</div>
            ))
          }
        </div>

        {selected === 'Power' ? <SliderPower /> : null}
        {selected === 'Year' ? <SliderYear /> : null}
        {selected === 'Price' ? <SliderPrice /> : null}

        {/* price is below */}
        {/* <Slider /> */}
        {/* I will have to make the same component for the year slider */}
        {/* I will have to make the same component for the power slider */}
      </div>
    </>
  );
};

export default Filters;

