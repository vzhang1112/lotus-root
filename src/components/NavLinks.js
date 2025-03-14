import React from 'react';
import { Link } from 'react-router-dom';

const AuthLinks = ({ toggleDropdown, dropdownVisible, handleLogout }) => (
    <>
        <li>
            <Link to="/landing-page" className="text-light hover:text-light-hover">
                Landing Page
            </Link>
        </li>
        <li className="text-light hover:text-light-hover relative group">
            <button onClick={toggleDropdown}>Account</button>
            {dropdownVisible && (
                <div className="absolute left-0 w-24 bg-accent shadow-lg rounded-lg px-2 py-1 transform scale-95 transition-all duration-200 z-60">
                    <ul>
                        <li>
                            <Link to="/profile" className="text-light hover:text-light-hover">
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link to="/settings" className="text-light hover:text-light-hover">
                                Settings
                            </Link>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="button">
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </li>
    </>
);

const GuestLinks = () => (
    <>
        <li className="navbar-item">
            <Link to="/login" className="text-light hover:text-light-hover">
                Login
            </Link>
        </li>
        <li className="navbar-item">
            <Link to="/signup" className="text-light hover:text-light-hover">
                Sign Up
            </Link>
        </li>
    </>
);

export { AuthLinks, GuestLinks };