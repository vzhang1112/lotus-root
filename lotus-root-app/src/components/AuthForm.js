import React, { useState } from 'react';

const AuthForm = ({ isLogin, onSubmit, errorMessage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!isLogin && !email.endsWith('utoronto.ca')) {
            setError('Email must end with utoronto.ca');
            return;
        }

        onSubmit(email, password);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError(''); // Clear the error state when the email changes
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white shadow-lg p-6 md:p-10 rounded-lg">
                <legend className="text-lg font-bold mb-4">{isLogin ? 'Login' : 'Sign Up'}</legend>
                <div className="flex flex-col gap-1 text-on-surface dark:text-on-surface-dark">
                    <label htmlFor="email" className="w-fit pl-0.5 text-sm">Email</label>
                    <input
                        id="email"
                        type="text"
                        className="input-default"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div className="flex flex-col gap-1 text-on-surface dark:text-on-surface-dark mt-4">
                    <label htmlFor="password" className="w-fit pl-0.5 text-sm">Password</label>
                    <input
                        id="password"
                        type="password"
                        className="input-default"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {(error || errorMessage) && <p style={{ color: 'red' }}>{error || errorMessage}</p>}
                <button type="submit" className="button mt-4">
                    {isLogin ? 'Login' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
};

export default AuthForm;