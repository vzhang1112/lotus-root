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
        <nav className="bg-blue-600 p-4 fixed top-0 w-full shadow-md z-50">
            <div className="container mx-auto flex justify-between">
                <div className="flex w-full items-center justify-between">
                    <Link to="/" className="text-3xl text-amber-200 hover:text-emerald-600">
                        <p text-2xl font-bold>
                        Lotus Root</p>
                    </Link>
                    <ul className="hidden md:flex space-x-6">
                        {user ? (
                            <navBarAuthenticated />
                        ) : (
                            <navBarNoAuth />
                        )}
                    </ul>
                    {/* <ul className="hidden md:flex space-x-6">
                        {user ? (
                            <ul className="hidden md:flex space-x-6">
                                <li>
                                    <Link to="/landing-page" className="text-white hover:text-gray-300">
                                    Landing Page</Link>
                                </li>
                                <li>
                                    <Link to="/my-swipe-cards" className="text-white hover:text-gray-300">
                                    My Swipe Cards</Link>
                                </li>
                                <li>
                                    <Link to="/swipe-on-people" className="text-white hover:text-gray-300">
                                    Swipe on others</Link>
                                </li>
                                <li className="text-white hover:text-gray-300 relative group">
                                    <button onClick={toggleDropdown} className="navbar-link">Account</button>
                                    {dropdownVisible && (
                                        <div className="absolute left-0 w-24 bg-blue-200 shadow-lg rounded-lg px-2 py-1 transform scale-95 transition-all duration-200 z-60">
                                            <ul>
                                                <li>
                                                    <Link to="/profile" 
                                                    className="text-black hover:text-gray-500">
                                                        Profile</Link>
                                                </li>
                                                <li>
                                                    <Link to="/settings" 
                                                    className="text-black hover:text-gray-500">
                                                        Settings</Link>
                                                </li>
                                                <li>
                                                    <button onClick={handleLogout} 
                                                    className="text-black hover:text-gray-500">
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
                                    <Link to="/login" className="navbar-link">Login</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/signup" className="navbar-link">Sign Up</Link>
                                </li>
                            </>
                        )}
                    </ul> */}
                    <button 
                        class="md:hidden text-white"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
                <div class={`absolute shadow-lg rounded-lg px-2 py-1 left-0 top-full md:hidden bg-blue-500 p-4 transition-all duration-300 ${isOpen ? "block" : "hidden"}`}>
                    {user ? (
                        <ul className="md:hidden space-x-6">
                            <li>
                                <Link to="/landing-page" className="text-white hover:text-gray-300">
                                Landing Page</Link>
                            </li>
                            <li>
                                <Link to="/my-swipe-cards" className="text-white hover:text-gray-300">
                                My Swipe Cards</Link>
                            </li>
                            <li>
                                <Link to="/swipe-on-people" className="text-white hover:text-gray-300">
                                Swipe on others</Link>
                            </li>
                            <li className="text-white hover:text-gray-300 relative group">
                                <button onClick={toggleDropdown} className="navbar-link">Account</button>
                                {dropdownVisible && (
                                    <div className="absolute left-0 w-24 bg-blue-200 shadow-lg rounded-lg px-2 py-1 transform scale-95 transition-all duration-200 z-60">
                                        <ul>
                                            <li>
                                                <Link to="/profile" 
                                                className="text-black hover:text-gray-500">
                                                    Profile</Link>
                                            </li>
                                            <li>
                                                <Link to="/settings" 
                                                className="text-black hover:text-gray-500">
                                                    Settings</Link>
                                            </li>
                                            <li>
                                                <button onClick={handleLogout} 
                                                className="text-black hover:text-gray-500">
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
                                <Link to="/login" className="navbar-link">Login</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/signup" className="navbar-link">Sign Up</Link>
                            </li>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;