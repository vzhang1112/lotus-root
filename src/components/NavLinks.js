import React from 'react';
import { Link } from 'react-router-dom';

const NavLinks = ({ user, handleLinkClick, handleLogout }) => {
    return (
        <>
            {user ? (
                <>
                    <li>
                        <Link to="/landing-page" className="text-light hover:text-light-hover" onClick={handleLinkClick}>
                            Landing Page
                        </Link>
                    </li>
                    <li>
                        <Link to="/my-swipe-cards" className="text-light hover:text-light-hover" onClick={handleLinkClick}>
                            My Swipe Cards
                        </Link>
                    </li>
                    <li>
                        <Link to="/swipe-on-people" className="text-light hover:text-light-hover" onClick={handleLinkClick}>
                            Swipe on others
                        </Link>
                    </li>
                    <li className="text-light hover:text-light-hover relative group">
                        <button onClick={handleLinkClick}>Account</button>
                        <div className="absolute left-0 w-24 bg-blue-200 shadow-lg rounded-lg px-2 py-1 transform scale-95 transition-all duration-200 z-60">
                            <ul>
                                <li>
                                    <Link to="/profile" className="text-light hover:text-light-hover" onClick={handleLinkClick}>
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/settings" className="text-light hover:text-light-hover" onClick={handleLinkClick}>
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
                    </li>
                </>
            ) : (
                <>
                    <li className="navbar-item">
                        <Link to="/login" className="text-light hover:text-light-hover" onClick={handleLinkClick}>
                            Login
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/signup" className="text-light hover:text-light-hover" onClick={handleLinkClick}>
                            Sign Up
                        </Link>
                    </li>
                </>
            )}
        </>
    );
};

export default NavLinks;