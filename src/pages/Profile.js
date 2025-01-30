import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
import { getFromSupabase } from '../utils/supabaseUtils.js';
import '../styles/App.css';

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
        <div className="example-class">
            <button type="button" onClick={() => navigate(-1)}>Back</button>
            <h1>{profile.display_name}</h1>
            <p class="subheading">HR Focus</p>
            <p>{profile.hr_focus}</p>
            <p class="subheading">Graduation Year</p>
            <p>{profile.grad_year}</p>
            <p class="subheading">Industry</p>
            <p>{profile.industry}</p>
            <p class="subheading">Company</p>
            <p>{profile.company}</p>
            <p class="subheading">Position</p>
            <p>{profile.position}</p>
            <button onClick={() => navigate('/edit-profile')}>Edit Profile</button>
        </div>
    );
};

export default Profile;