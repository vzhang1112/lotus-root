import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
import '../styles/App.css'

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
                    <h1 className="text-x1">Welcome to Lotus Root!</h1>
                    <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" onClick={() => navigate('/login')}>Log in</button>
                    <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" onClick={() => navigate('/signup')}>Sign up</button>
                </div>
            )}
        </div>
    );
}

export default Home;