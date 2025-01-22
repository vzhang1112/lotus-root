import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';

function Home() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div>
            {user ? (
                <div>
                    <h1>Welcome back, {user.email}!</h1>
                    <button onClick={logout}>Log out</button>
                </div>
            ) : (
                <div>
                    <h1>Welcome to Lotus Root!</h1>
                    <button onClick={() => navigate('/login')}>Log in</button>
                    <button onClick={() => navigate('/signup')}>Sign up</button>
                </div>
            )}
        </div>
    );
}

export default Home;