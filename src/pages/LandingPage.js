import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';

function LandingPage() {
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
        <div class="mt-16 sm:mt-20 md:mt-24 lg:mt-32 xl:mt-40 mx-auto max-w-4xl p-6">
            <h1>h1: I have no idea what I'm doing</h1>
            <h2>h2: Welcome to the landing page!</h2>
            <h3>h3: You're logged in now</h3>
            <h4>h4: Your email is {user.email}</h4>
            <p>p: I'm also going to use this page as a font size tester</p>
            <button onClick={handleLogout}>Log out</button>
        </div>
    );
}

export default LandingPage;