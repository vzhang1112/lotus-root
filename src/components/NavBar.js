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
        <nav className="navbar bg-base-100">
            <div className="flex-none">
                <h1>Lotus Root</h1>
                <ul className="main menu-horizontal px-1">
                    <li className="navbar-item">
                        <Link to="/" className="navbar-link">Home</Link>
                    </li>
                    {user ? (
                        <>
                            <li className="navbar-item">
                                <Link to="/landing-page" className="navbar-link">Landing Page</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/my-swipe-cards" className="navbar-link">My Swipe Cards</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/swipe-on-people" className="navbar-link">Swipe on others</Link>
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
            </div>
        </nav>
    );
};

export default NavBar;