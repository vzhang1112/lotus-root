import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
import { getProfile, createProfile, updateProfile } from '../utils/profileUtils.js';
import { supabase } from '../utils/supabase.ts';

const ProfileForm = () => {
    const { user } = useContext(AuthContext);
    const [displayName, setDisplayName] = useState('');
    const [hrFocus, setHrFocus] = useState('');
    const [gradYear, setGradYear] = useState('');
    const [industry, setIndustry] = useState('');
    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) {
                setError("User not authenticated");
                setLoading(false);
                return;
            }

            try {
                console.log("Fetching profile for user:", user.id);
                const testResult = await supabase.from('profiles').select('*');
                console.log('Test result:', testResult);
                const profileResult = await getProfile(user.id);
                console.log("Profile result:", profileResult);

                if (profileResult.success && profileResult.data) {
                    const profile = profileResult.data;
                    setDisplayName(profile.display_name);
                    setHrFocus(profile.hr_focus);
                    setGradYear(profile.grad_year);
                    setIndustry(profile.industry);
                    setCompany(profile.company);
                    setPosition(profile.position);
                    setIsUpdating(true);
                }
            } catch (error) {
                setError("Error fetching profile: " + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user]);

    if (loading) {
        return <p>Loading profile...</p>
    }

    if (!user) {
        return <p>User not authenticated</p>
    }

    const handleProfileCreation = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!user) {
            setError('User not authenticated');
            return;
        }

        const profileData = {
            user_id: user.id,
            displayName,
            hrFocus,
            gradYear,
            industry,
            company,
            position,
        };

        console.log('Profile Data:', profileData);

        let profileResult;
        if (isUpdating) {
            profileResult = await updateProfile(user.id, profileData);
        } else {
            profileResult = await createProfile(profileData);
        }

        if (!profileResult.success) {
            setError('Error creating profile: ' + profileResult.error.message);
        } else {
            setMessage('Profile created successfully');
            navigate('/profile');
        }
    };

    if (!user) {
        return <p>Loading user...</p>;
    }

    return (
        <form onSubmit={handleProfileCreation}>
            <input
                type="text"
                class="input-default"
                placeholder="Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
            />
            <input
                type="text"
                class="input-default"
                placeholder="HR Focus"
                value={hrFocus}
                onChange={(e) => setHrFocus(e.target.value)}
                required
            />
            <input
                type="text"
                class="input-default"
                placeholder="Graduation Year"
                value={gradYear}
                onChange={(e) => setGradYear(e.target.value)}
                required
            />
            <input
                type="text"
                class="input-default"
                placeholder="Industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                required
            />
            <input
                type="text"
                class="input-default"
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
            />
            <input
                type="text"
                class="input-default"
                placeholder="Position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
            />
            <button type="submit" class="button">{isUpdating ? 'Update Profile' : 'Create Profile'}</button>
            {message && <p>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default ProfileForm;