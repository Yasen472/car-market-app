import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useAuth } from "../auth/authContext.js";
import { FaBars } from 'react-icons/fa'; // Import the hamburger icon

const Navbar = () => {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false); // State to handle mobile menu

    const handleLogout = () => {
        logout();
        navigate("/");
        setMenuOpen(false); // Close the menu on logout
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen); // Toggle menu visibility
    };

    const handleLinkClick = () => {
        setMenuOpen(false); // Close the menu when a link is clicked
    };

    return (
        <div className="navbar-container">
            {/* Close menu when BGCARS is clicked */}
            <Link to="/" className="nav-link-header" onClick={handleLinkClick}>
                BGCARS
            </Link>

            <div className={`links ${menuOpen ? 'active' : ''}`}>
                {isLoggedIn ? (
                    <>
                        <Link to="/profile" className="nav-link" onClick={handleLinkClick}>
                            Profile
                        </Link>
                        <Link to="/" onClick={handleLogout} className="nav-link">
                            Logout
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link" onClick={handleLinkClick}>
                            Login
                        </Link>
                        <Link to="/register" className="nav-link" onClick={handleLinkClick}>
                            Register
                        </Link>
                    </>
                )}
            </div>

            {/* Hamburger Icon for Mobile */}
            <div className="menu-icon" onClick={toggleMenu}>
                <FaBars />
            </div>
        </div>
    );
};

export default Navbar;
