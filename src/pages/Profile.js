import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
import { getFromSupabase } from '../utils/supabaseUtils.js';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) {
                setError("profile.js User not authenticated");
                return;
            }

            try {
                console.log('Fetching profile for user:', user.id);
                const profileResult = await getFromSupabase(user.id, "profiles");

                if (!profileResult.success) {
                    setError('Error fetching profile: ' + profileResult.error.message);
                } else {
                    console.log('Profile fetched:', profileResult.data);
                    setProfile(profileResult.data);
                }
            } catch (error) {
                setError("Error fetching profile: " + error.message);
            }
        };

        fetchProfile();
    }, [user]);

    if (!user) {
        return <p>Loading user...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!profile) {
        return <p>Loading profile...</p>;
    }

    return (
        <div>
            <button type="button" onClick={() => navigate(-1)}>Back</button>
            <h1>{profile.display_name}</h1>
            <p>{profile.hr_focus}</p>
            <p>{profile.grad_year}</p>
            <p>{profile.industry}</p>
            <p>{profile.company}</p>
            <p>{profile.position}</p>
            <button onClick={() => navigate('/edit-profile')}>Edit Profile</button>
        </div>
    );
};

export default Profile;