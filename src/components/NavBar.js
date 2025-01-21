import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="navbar">
            <h1>Lotus Root</h1>
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/" className="navbar-link">Home</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/profile" className="navbar-link">Profile</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/my-swipe-cards" className="navbar-link">My Swipe Cards</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;