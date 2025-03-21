import { supabase } from '../utils/supabase.ts';
import React, { useState } from 'react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        // clear out previous messages
        setMessage('');
        setError('');

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            // the url for resetting password
            redirectTo: `${window.location.origin}/reset-password`,
        });

        if (error) {
            setError(error.message);
        } else {
            setMessage('Password reset email sent, check inbox');
        }
    };

    return (
        <div>
            <h1>Forgot password</h1>
            <form onSubmit={handleForgotPassword}>
                <input
                    type='email'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Send reset email</button>
            </form>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default ForgotPassword;