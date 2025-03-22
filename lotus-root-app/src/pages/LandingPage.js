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
        <div class="body-default">
            <div>
                <p>LandingPage.js</p>
                <h1>h1: I have no idea what I'm doing</h1>
                <h2>h2: Welcome to the landing page!</h2>
                <h3>h3: You're logged in now</h3>
                <h4>h4: Your email is {user.email}</h4>
                <h5>h5: maybe this'll work</h5>
                <p>p: I'm also going to use this page as a font size tester</p>
                <button onClick={handleLogout}>Log out</button>
            </div>
        </div>
    );
}

export default LandingPage;