import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';

const NavBar = () => {
    const { user, logout } = useContext(AuthContext);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <h1>Lotus Root</h1>
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/" className="navbar-link">Home</Link>
                </li>
                {user ? (
                    <>
                        <p>user in navbar is {user.email}</p>
                        <li className="navbar-item">
                            <Link to="/landing-page" className="navbar-link">Landing Page</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/my-swipe-cards" className="navbar-link">My Swipe Cards</Link>
                        </li>
                        <li className="navbar-item">
                            <button onClick={toggleDropdown} className="navbar-link">Account</button>
                            {dropdownVisible && (
                                <div className='dropdown-menu'>
                                    <Link to="/profile" className="dropdown-item">Profile</Link>
                                    <Link to="/settings" className="dropdown-item">Settings</Link>
                                    <button onClick={handleLogout} className="dropdown-item">Logout</button>
                                </div>
                            )}
                        </li>
                    </>
                ) : (
                    <>
                        <li className="navbar-item">
                            <Link to="/login" className="navbar-link">Login</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/signup" className="navbar-link">Sign Up</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;