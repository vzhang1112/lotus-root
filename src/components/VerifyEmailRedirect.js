import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
import { supabase } from '../../supabase.ts';

const VerifyEmailRedirect = () => {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                console.error('Error fetching user data:', error.message);
                navigate('/login');
                return;
            }

            if (data.user && data.user.email_confirmed_at) {
                setUser(data.user);
                navigate('/profile-initialization');
            } else {
                navigate('/login');
            }
        };

        verifyEmail();
    }, [navigate, setUser]);

    return <p>Verifying email...</p>;
};

export default VerifyEmailRedirect;