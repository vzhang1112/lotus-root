import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';

function Home() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <body class="body-default">
            <div>
                {user ? (
                    <div>
                        <p>Home.js</p>
                        <h1 class="text-3xl">Welcome back, {user.email}!</h1>
                        <button onClick={logout}>
                            Log out</button>
                    </div>
                ) : (
                    <div class="mt-16 sm:mt-20 md:mt-24 lg:mt-32 xl:mt-40 mx-auto max-w-4xl p-6">
                        <p>Home.js</p>
                        <h1 className="text-3xl">Welcome to Lotus Root!</h1>
                        <button onClick={() => navigate('/login')}>
                            Log in
                            </button>
                        <button onClick={() => navigate('/signup')}>
                            Sign up
                            </button>
                    </div>
                )}
            </div>
        </body>    
    );
}

export default Home;