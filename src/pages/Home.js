import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';

function Home() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div>
            {user ? (
                <div class="mt-16 sm:mt-20 md:mt-24 lg:mt-32 xl:mt-40 mx-auto max-w-4xl p-6">
                    <h1 class="text-3xl">Welcome back, {user.email}!</h1>
                    <button className="whitespace-nowrap rounded-radius bg-secondary border border-secondary px-4 py-2 text-sm font-medium tracking-wide text-on-secondary transition hover:opacity-75 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary active:opacity-100 active:outline-offset-0 disabled:opacity-75 disabled:cursor-not-allowed dark:bg-secondary-dark dark:border-secondary-dark dark:text-on-secondary-dark dark:focus-visible:outline-secondary-dark" 
                    onClick={logout}>Log out</button>
                </div>
            ) : (
                <div class="mt-16 sm:mt-20 md:mt-24 lg:mt-32 xl:mt-40 mx-auto max-w-4xl p-6">
                    <h1 className="text-3xl">Welcome to Lotus Root!</h1>
                    <button className="whitespace-nowrap rounded-radius bg-secondary border border-secondary px-4 py-2 text-sm font-medium tracking-wide text-on-secondary transition hover:opacity-75 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary active:opacity-100 active:outline-offset-0 disabled:opacity-75 disabled:cursor-not-allowed dark:bg-secondary-dark dark:border-secondary-dark dark:text-on-secondary-dark dark:focus-visible:outline-secondary-dark" 
                    onClick={() => navigate('/login')}>
                        Log in
                        </button>
                    <button className="whitespace-nowrap rounded-radius bg-secondary border border-secondary px-4 py-2 text-sm font-medium tracking-wide text-on-secondary transition hover:opacity-75 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary active:opacity-100 active:outline-offset-0 disabled:opacity-75 disabled:cursor-not-allowed dark:bg-secondary-dark dark:border-secondary-dark dark:text-on-secondary-dark dark:focus-visible:outline-secondary-dark" 
                    onClick={() => navigate('/signup')}>
                        Sign up
                        </button>
                </div>
            )}
        </div>
        
    );
}

export default Home;