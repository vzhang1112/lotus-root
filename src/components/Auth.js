import React, { useState } from 'react';
import { supabase } from '../utils/supabase.ts';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // collect profile info start  
    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');
    const [gradYear, setGradYear] = useState('');
    const [industry, setIndustry] = useState('');
    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');
    // login screen details start
    const [isLogin, setIsLogin] = useState(''); // toggles bt login & signup
    const [message, setMessage] = useState('');

    const handleAuth = async(e) => {
        // e refers to any event
        let result;
        if (isLogin) {
            // login user
            result = await supabase.auth
            .signInWithPassword({ email, password });
        } else { 
            // handle signup
            result = await supabase.auth
            .signUp ({ email, password });
            if (!result.error) {
                // create profile
                const { user } = result.data;

                // creating new profile with given info
                await supabase.from('profiles').insert([{
                    user_id: user.id,
                    display_name: displayName,
                    bio,
                    grad_year: gradYear,
                    industry,
                    company,
                    position
                    }
                ]);
                if (profileError) {
                    console.error('Error creating profile:', profileError.message);
                    setMessage('Sign-up successful, but error creating profile');
                    return;
                }
            }
        }

        const { error } = result;
        // if there is an error during login process
        if (error) {
            setMessage(error.message);
        } else {
            setMessage(isLogin ? 'Logged in successfully!' :
                'Sign-up successful! Check your email for verification.'
            );
        }
    };

    return (
        <div>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={handleAuth}>
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {!isLogin && (
                    <>
                    <input
                        type="text"
                        placeholder="Display Name"
                        value={displayName}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Short bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Graduation year"
                        value={gradYear}
                        onChange={(e) => setGradYear(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Industry"
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        required
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
                <button type="submit">{isLogin? 'Login' : 'Sign Up'}</button>
            </form>
            <p>
                {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Sign Up' : 'Login'}
                </button>
            </p>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Auth;