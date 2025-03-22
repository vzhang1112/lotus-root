import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
import ProfileForm from '../components/ProfileForm.js';
import { supabase } from '../../../shared/supabase.ts';

const ProfileInitialization = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const checkEmailVerified = async () => {
            if (!user) {
                navigate('/login');
                return;
            }

            const { data, error } = await supabase.auth.getUser();
            if (error) {
                console.error('Error fetching user data:', error);
                return;
            }

            if (!data.user || !data.user.email_confirmed_at) {
                navigate('/email-verification');
            }
        };

        checkEmailVerified();
    }, [user, navigate]);

    return (
        <div className="flex justify-center items-center h-screen">
            <ProfileForm />
        </div>
    );
};

export default ProfileInitialization;