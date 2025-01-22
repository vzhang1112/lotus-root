import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';

function Dashboard() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    }

    if (!user) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h1>I have no idea what I'm doing</h1>
            <h2>Welcome to the landing page!</h2>
            <h3>You're logged in now</h3>
            <h4>Your email is {user.email}</h4>
            <button onClick={handleLogout}>Log out</button>
        </div>
    );
}

export default Dashboard;