import React, { useState } from 'react';
import { supabase } from '../../../shared/supabase.ts';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        // clear out previous messages
        setMessage('');
        setError('');

        const { error } = await supabase.auth.updateUser({password});

        if (error) {
            setError(error.message);
        } else {
            setMessage('Your password updated successfully');
        }
    };

    return (
        <div>
            <h1>Reset password</h1>
            <form onSubmit={handleResetPassword}>
                <input
                    type='password'
                    placeholder='Enter new password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default ResetPassword;