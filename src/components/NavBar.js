import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
import { Menu, X } from "lucide-react";
import { AuthLinks, GuestLinks } from './NavLinks';

const NavBar = () => {
    const { user, logout } = useContext(AuthContext);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleLogout = async () => {
        await logout();
    };

    return (
        <nav className="p-4 fixed top-0 w-full shadow-md z-50 bg-background">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/">
                    <h2 className="text-light hover:text-emerald-600 font-bold">
                        Lotus Root
                    </h2>
                </Link>
                <ul className="hidden md:flex space-x-6 items-center">
                    {user ? (
                        <AuthLinks 
                            toggleDropdown={toggleDropdown} 
                            dropdownVisible={dropdownVisible} 
                            handleLogout={handleLogout} 
                        />
                    ) : (
                        <GuestLinks />
                    )}
                </ul>
                <button 
                    className="md:hidden button"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <div className={`absolute right-0 shadow-lg rounded-lg px-2 py-1 mr-1 md:hidden bg-accent p-4 transition-all duration-300 top-full transform ${isOpen ? "block" : "hidden"}`}>
                    <ul className="space-y-4">
                        {user ? (
                            <AuthLinks 
                                toggleDropdown={toggleDropdown} 
                                dropdownVisible={dropdownVisible} 
                                handleLogout={handleLogout} 
                            />
                        ) : (
                            <GuestLinks />
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;