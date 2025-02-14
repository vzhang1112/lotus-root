import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';

const Auth = ({ initialIsLogin = true }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(initialIsLogin); // toggles between login & signup
    const [message, setMessage] = useState('');
    const [authError, setAuthError] = useState('');
    const { login, signup }  = useContext(AuthContext);

    const navigate = useNavigate();

    const handleAuth = async (e) => {
        e.preventDefault();
        // clear out all previous messages
        setMessage('');
        setAuthError('');

        try {
            let error;
            if (isLogin) {
                // login user
                error = await login(email, password);
                // if credentials are wrong
                if (error) {
                    if (error.message.includes('Invalid login credentials')) {
                        setAuthError('Incorrect email or password. Please try again.');
                    } else if (error.message.includes('User not confirmed')) {
                        setAuthError('Your email is not verified, please check inbox');
                    } else {
                        setAuthError('An unexpected error occurred. Please try again later');
                    }
                    // prevents further execution
                    return;
                }
                // within the isLogin if statement, if login is successful
                setMessage('Logged in successfully');
                navigate('/landing-page'); // navigate to dashboard or desired page
            } else {
                // handle signup
                error = await signup(email, password);
                if (error) {
                    setAuthError(error.message);
                    return;
                }
                setMessage("Signed up successfully. Please check your email.");
                navigate('/landing-page');
            }
        } catch (error) {
            setAuthError('An unexpected error occurred. Please try again later.');
            console.error('Unexpected error:', error);
        }
    };

    return (
        <form onSubmit={handleAuth}>
            <legend className="text-lg font-bold">{isLogin ? 'Login' : 'Sign Up'}</legend>
            <div class="flex max-w-xs flex-col gap-1 text-on-surface dark:text-on-surface-dark">
                <label for="textInputDefault" class="w-fit pl-0.5 text-sm">Email</label>
                <br></br>
                <input
                    id="textInputDefault"
                    type="text"
                    className="input-default"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div class="flex max-w-xs flex-col gap-1 text-on-surface dark:text-on-surface-dark">
                <label for="textInputDefault" class="w-fit pl-0.5 text-sm">Password</label>
                <br></br>
                <input
                    id="textInputDefault"
                    type="password"
                    className="input-default"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" class="button">
                {isLogin ? 'Login' : 'Sign Up'}
                </button>
            <button type="button" class="button" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
            </button>
            {message && <p>{message}</p>}
            {authError && <p style={{ color: 'red' }}>{authError}</p>}
        </form>
    );
};

export default Auth;