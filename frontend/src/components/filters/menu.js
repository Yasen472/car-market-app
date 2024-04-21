import { React, useEffect, useState } from 'react'
import './menu.css'
import SliderPrice from './sliderPrice.js';
import SliderPower from './sliderPower.js';
import axios from 'axios';
import { baseURL } from '../utils/constant.js';

const Menu = () => {
    const [make, setMake] = useState([]);
    const [model, setModel] = useState([]);

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
            const makes = response.data.map(car => car.make)
                                        .sort((a, b) => a.localeCompare(b));
            const models = response.data.map(car => car.model)
                                        .sort((a, b) => a.localeCompare(b));
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
    
    return (
        
        <div className="menu-container">
            <div className="header">
                <h2>Color</h2>
            </div>
            <div className="options-container">
                <div>Red</div>
                <div>Yellow</div>
                <div>Black</div>
                <div>Blue</div>
                <div>White</div>
                <div>Green</div>
                <div>Grey</div>
            </div>
            {/* price is below */}
            {/* <Slider /> */}
            {/* I will have to make the same component for the year slider */}
            {/* I will have to make the same component for the power slider */}
        </div>
    )
}

export default Menu