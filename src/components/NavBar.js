import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
import { Menu, X } from "lucide-react";

const NavBar = () => {
    const { user, logout } = useContext(AuthContext);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <nav className="p-4 fixed top-0 w-full shadow-md z-50 bg-background">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/">
                    <p classname="text-2xl text-light hover:text-emerald-600 font-bold">
                    Lotus Root</p>
                </Link>
                {/* hidden md:flex means that when window size is md, so 
                usually on desktop, that this menu will not be visible */}
                <ul className="hidden md:flex space-x-6 items-center">
                    {user ? (
                        <>
                            <li>
                                <Link to="/landing-page" className="text-light hover:text-light-hover">
                                Landing Page</Link>
                            </li>
                            <li>
                                <Link to="/my-swipe-cards" className="text-light hover:text-light-hover">
                                My Swipe Cards</Link>
                            </li>
                            <li>
                                <Link to="/swipe-on-people" className="text-light hover:text-light-hover">
                                Swipe on others</Link>
                            </li>
                            <li className="text-light hover:text-light-hover relative group">
                                <button onClick={toggleDropdown}>Account</button>
                                {dropdownVisible && (
                                    <div className="absolute left-0 w-24 bg-blue-200 shadow-lg rounded-lg px-2 py-1 transform scale-95 transition-all duration-200 z-60">
                                        <ul>
                                            <li>
                                                <Link to="/profile" 
                                                className="text-light hover:text-light-hover">
                                                    Profile</Link>
                                            </li>
                                            <li>
                                                <Link to="/settings" 
                                                className="text-light hover:text-light-hover">
                                                    Settings</Link>
                                            </li>
                                            <li>
                                                <button onClick={handleLogout} class="button">
                                                    Logout</button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="navbar-item">
                                <Link to="/login" className="text-light hover:text-light-hover">
                                Login</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/signup" className="text-light hover:text-light-hover">
                                Sign Up</Link>
                            </li>
                        </>
                    )}
                </ul>
                <button 
                    class="md:hidden button"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <div class={`absolute right-0 shadow-lg rounded-lg px-2 py-1 mr-1 md:hidden bg-secondary p-4 transition-all duration-300 top-full transform ${isOpen ? "block" : "hidden"}`}>
                    {user ? (
                        <ul className="sm:hidden space-x-6">
                            <li>
                                <Link to="/landing-page" className="text-light hover:text-light-hover">
                                Landing Page</Link>
                            </li>
                            <li>
                                <Link to="/my-swipe-cards" className="text-light hover:text-light-hover">
                                My Swipe Cards</Link>
                            </li>
                            <li>
                                <Link to="/swipe-on-people" className="text-light hover:text-light-hover">
                                Swipe on others</Link>
                            </li>
                            <li className="text-light hover:text-light-hover relative group">
                                <button onClick={toggleDropdown}>Account</button>
                                {dropdownVisible && (
                                    <div className="absolute left-0 w-24 bg-secondary shadow-lg rounded-lg px-2 py-1 transform scale-95 transition-all duration-200 z-60">
                                        <ul>
                                            <li>
                                                <Link to="/profile" 
                                                className="text-light hover:text-light-hover">
                                                    Profile</Link>
                                            </li>
                                            <li>
                                                <Link to="/settings" 
                                                className="text-light hover:text-light-hover">
                                                    Settings</Link>
                                            </li>
                                            <li>
                                                <button onClick={handleLogout} class="button">
                                                    Logout</button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </li>
                        </ul>  
                    ) : (
                        <>
                            <li className="navbar-item">
                                <Link to="/login" className="text-light hover:text-light-hover">Login</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/signup" className="text-light hover:text-light-hover">Sign Up</Link>
                            </li>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;