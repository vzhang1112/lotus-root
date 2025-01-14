import React, { useState } from 'react';
import { supabase } from '../utils/supabase.ts'; // Adjust the import path as needed

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(''); // toggles between login & signup
    const [message, setMessage] = useState('');
    const [authError, setAuthError] = useState('');

    const handleAuth = async (e) => {
        e.preventDefault();
        // clear out all previous messages
        setMessage('');
        setAuthError('');

        try {
            let result;
            if (isLogin) {
                // login user
                result = await supabase.auth.signInWithPassword({ email, password });
                setAuthError('');

                // if credentials are wrong
                if (result.error) {
                    if (result.error.message.includes('Invalid login credentials')) {
                        setAuthError('Incorrect email or password. Please try again.');
                    } else if (result.error.message.includes('User not confirmed')) {
                        setAuthError('Your email is not verified, please check inbox');
                    } else {
                        setAuthError('An unexpected error occurred. Please try again later');
                    }
                    // prevents further execution
                    return;
                }
                // within the isLogin if statement, if login is successful
                setMessage('Logged in successfully');
            } else {
                // handle signup
                result = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: 'http://localhost:3000/welcome', // Adjust the URL as needed
                    },
                });

                if (!result.error) {
                    setMessage('Signed up successfully. Please check your email to verify your account.');
                } else {
                    setAuthError(result.error.message);
                    return;
                }
            }

            const { error } = result;
            // if there is an error during login process
            if (error) {
                setMessage(error.message);
            }
        } catch (error) {
            setAuthError('An unexpected error occurred. Please try again later.');
            console.error('Unexpected error:', error);
        }
    };

    return (
        <form onSubmit={handleAuth}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
            <button type="button" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
            </button>
            {message && <p>{message}</p>}
            {authError && <p style={{ color: 'red' }}>{authError}</p>}
        </form>
    );
};

export default Auth;