import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../../shared/supabase.ts';

const EmailVerification = () => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const emailParam = queryParams.get('email');
        if (emailParam) {
            setEmail(emailParam);
        } else {
            setError('No email provided for verification.');
        }

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
    }, [navigate, location.search]);

    const resendVerificationEmail = async () => {
        const { error } = await supabase.auth.resend({
            type: 'signup',
            email: email,
            options: {
                emailRedirectTo: `${window.location.origin}/profile-initialization`
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
                {email ? (
                    <>
                        <p>User email: {email}</p>
                        <h1 className="text-lg font-bold">Verify Your Email</h1>
                        <p>Please verify your email address to continue.</p>
                        {message && <p>{message}</p>}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <button onClick={resendVerificationEmail} className="button mt-4">
                            Resend Verification Email
                        </button>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default EmailVerification;