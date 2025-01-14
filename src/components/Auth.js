import React, { useState } from 'react';
import { supabase } from '../utils/supabase.ts'; // Adjust the import path as needed
import { createProfile } from './Profile'; // Adjust the import path as needed

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');
    const [gradYear, setGradYear] = useState('');
    const [industry, setIndustry] = useState('');
    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');
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
                result = await supabase.auth.signUp({ email, password });

                if (!result.error) {
                    // create profile
                    const { user } = result.data;

                    // creating new profile with given info
                    const profileData = {
                        displayName,
                        bio,
                        gradYear,
                        industry,
                        company,
                        position
                    };

                    const profileResult = await createProfile(user, profileData);

                    if (!profileResult.success) {
                        setMessage('Sign-up successful, but error creating profile');
                        return;
                    }
                    setMessage('Signed up successfully');
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
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {!isLogin && (
                <>
                    <input
                        type="text"
                        placeholder="Display Name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Graduation Year"
                        value={gradYear}
                        onChange={(e) => setGradYear(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Industry"
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Position"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                    />
                </>
            )}
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