import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
import { supabase } from '../utils/supabase.ts';

const EmailVerification = () => {
    const { user } = useContext(AuthContext);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const checkEmailVerified = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                setError('Error fetching user data: ' + error.message);
                return;
            }

            if (data.user && data.user.email_confirmed_at) {
                navigate('/profile-initialization');
            }
        };

        checkEmailVerified();
    }, [navigate]);

    const resendVerificationEmail = async () => {
        const { error } = await supabase.auth.resend({
            type: 'signup',
            email: user.email,
            options: {
                emailRedirectTo: `${window.location.origin}/verify-email-redirect`
            }
        });
        if (error) {
            setError('Error sending verification email: ' + error.message);
        } else {
            setMessage('Verification email sent. Please check your inbox.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white shadow-lg p-6 md:p-10 rounded-lg">
                <p>user email: {user.email}</p>
                <h1 className="text-lg font-bold">Verify Your Email</h1>
                <p>Please verify your email address to continue.</p>
                {message && <p>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button onClick={resendVerificationEmail} className="button mt-4">
                    Resend Verification Email
                </button>
            </div>
        </div>
    );
};

export default EmailVerification;