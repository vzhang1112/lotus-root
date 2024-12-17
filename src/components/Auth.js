import React, { useState } from 'react';
import { supabase } from '../../utils/supabase';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
            result = await supabase.auth
            .signUp ({ email, password });
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