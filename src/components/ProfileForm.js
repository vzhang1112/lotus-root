/**
 * @fileoverview This file contains the ProfileForm component, which is a React functional component
 * that allows users to create a profile by filling out a form with their display name, bio, graduation year,
 * industry, company, and position. The component uses Supabase for authentication and profile creation.
 * It manages form state using React's useState hook and handles form submission with an asynchronous function.
 * If the profile creation is successful, a success message is displayed; otherwise, an error message is shown.
 */


import React, { useState } from 'react';
import { supabase } from '../utils/supabase.ts';
import { createProfile } from '../utils/profileUtils.js';
import { useBackNavigation } from '../utils/navigationUtils.js';


/**
 * ProfileForm component allows users to create a profile by filling out a form.
 * The form includes fields for display name, bio, graduation year, industry, company, and position.
 * Upon submission, it handles profile creation by calling the `ProfileForm` function with the user's data.
 * 
 * @component
 * @example
 * return (
 *   <ProfileForm />
 * )
 * 
 * @returns {JSX.Element} A form for creating a user profile.
 */
const ProfileForm = () => {
    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');
    const [gradYear, setGradYear] = useState('');
    const [industry, setIndustry] = useState('');
    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleBack = useBackNavigation();

    const handleProfileCreation = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError) {
            setError('Error fetching user: ' + userError.message);
            return;
        }

        if (!user) {
            setError('User not authenticated');
            return;
        }

        const profileData = {
            user_id: user.id,
            displayName,
            bio,
            gradYear,
            industry,
            company,
            position,
        };

        console.log('Profile Data:', profileData);

        // const profileResult = await createProfile(user, profileData);
        const profileResult = await createProfile(profileData);

        if (!profileResult.success) {
            setError('Error creating profile: ' + profileResult.error.message);
        } else {
            setMessage('Profile created successfully');
        }
    };

    return (
        <form onSubmit={handleProfileCreation}>
            <button type="button" onClick={handleBack}>Back</button>
            <input
                type="text"
                placeholder="Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Graduation Year"
                value={gradYear}
                onChange={(e) => setGradYear(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
            />
            <button type="submit">Create Profile</button>
            {message && <p>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default ProfileForm;