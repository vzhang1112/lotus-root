import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
import { supabase } from '../utils/supabase.ts';

const VerifyEmailRedirect = () => {
    const { user } = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const checkEmailVerified = async () => {
            if (!user) {
                navigate('/login');
                return;
            }

            const { data, error } = await supabase.auth.getUser();
            if (error) {
                setError('Error fetching user data: ' + error.message);
                return;
            }

            if (data.user && data.user.email_confirmed_at) {
                navigate('/profile-initialization');
            } else {
                setError('Email not verified. Please check your inbox.');
            }
        };

        checkEmailVerified();
    }, [user, navigate]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white shadow-lg p-6 md:p-10 rounded-lg">
                <h1 className="text-lg font-bold">Verifying Email...</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
};

export default VerifyEmailRedirect;