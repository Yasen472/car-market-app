import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useAuth } from "../auth/authContext.js";

const Navbar = () => {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate(); // Initialize useNavigate for navigation

    const handleLogout = () => {
        logout();
        navigate("/"); // Redirect to home page after logout using navigate
    };

    return (
        <div className="navbar-container">
            <ul className="nav-links-container">
                <Link to="/" className="nav-link-header">
                    BGCARS
                </Link>
                <div className="links">
                    {isLoggedIn ? (
                        <>
                            <Link to="/profile" className="nav-link">
                                Profile
                            </Link>
                            <Link
                                to="/"
                                onClick={handleLogout}
                                className="nav-link"
                            >
                                Logout
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">
                                Login
                            </Link>
                            <Link to="/register" className="nav-link">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </ul>
        </div>
    );
};

export default Navbar;
