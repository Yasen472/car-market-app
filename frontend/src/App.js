// App.js
import './App.css';
import Navbar from './components/navbar/navbar.js';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/home.js';
import Register from './components/register/register.js';
import Login from './components/login/login.js';
import Profile from './components/profile/profile.js';
import Listings from './components/listings/listings.js';
import { AuthProvider } from './components/auth/authContext.js';
import Filters from './components/filters/filters.js';
import CurrentListing from './components/listings/currentListing.js';
import Menu from './components/filters/menu.js';

function App() {

  return (
    <>
    <AuthProvider>
    <div className="app-container">
    {/* <AuthProvider> */}
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/filters" element={<Filters />} />
        <Route path="/currentListing/:id" element={<CurrentListing />} />
      
        <Route path="/menu" element={<Menu />} />
      </Routes>
      {/* </AuthProvider> */}
      </div>
      </AuthProvider>
    </>
  );
}

export default App;

// padding otlqvo i otdqsno
