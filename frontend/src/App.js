import React from 'react';
import './App.css';
import Navbar from './components/navbar/navbar.js';
import { Routes, Route } from 'react-router-dom';
import Register from './components/register/register.js';
import Login from './components/login/login.js';
import Profile from './components/profile/profile.js';
import Listings from './components/listings/listings.js';
import { AuthProvider } from './components/auth/authContext.js';
import Filters from './components/filters/filters.js';
import CurrentListing from './components/listings/currentListing.js';
import { FilterProvider } from './components/context/FilterContext.js';
import CarListingForm from './components/listings/CarListingForm.js';
import { PriceProvider } from './components/context/PriceContext.js';
import { PowerProvider } from './components/context/PowerContext.js';
import { YearProvider } from './components/context/YearContext.js';
import { KilometresProvider } from './components/context/KilometresContext.js';

function App() {
  
  return (
    <AuthProvider>
      <YearProvider>
      <PowerProvider>
      <PriceProvider>
      <FilterProvider>
      <KilometresProvider>
        <div className="app-container">
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<Listings />} />
              <Route path="/filters" element={<Filters />} />
              <Route path="/currentListing/:id" element={<CurrentListing />} />
              <Route path="/carListing" element={<CarListingForm />} />
            </Routes>
          </div>
        </div>
      </KilometresProvider>
      </FilterProvider>
      </PriceProvider>
      </PowerProvider>
      </YearProvider>
    </AuthProvider>
  );
}

export default App;
