import React from 'react';
import { Link } from 'react-router-dom';

const DropdownMenu = ({ dropdownVisible, handleLinkClick, handleLogout }) => {
    return (
        dropdownVisible && (
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
        )
    );
};

export default DropdownMenu;