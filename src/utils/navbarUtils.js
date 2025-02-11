const navBarAuthenticated = () => {
    return (
        <ul>
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
    );
};

const navBarNoAuth = () => {
    return (
        <>
            <li className="navbar-item">
                <Link to="/login" className="navbar-link">Login</Link>
            </li>
            <li className="navbar-item">
                <Link to="/signup" className="navbar-link">Sign Up</Link>
            </li>
    </>
    );
};