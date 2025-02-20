import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
import { createProfile, updateProfile } from '../utils/profileUtils.js';

const ProfileForm = ({ initialData = {}, isUpdating = false }) => {
    const { user } = useContext(AuthContext);
    const [displayName, setDisplayName] = useState(initialData.display_name || '');
    const [hrFocus, setHrFocus] = useState(initialData.hr_focus || '');
    const [gradYear, setGradYear] = useState(initialData.grad_year || '');
    const [industry, setIndustry] = useState(initialData.industry || '');
    const [company, setCompany] = useState(initialData.company || '');
    const [position, setPosition] = useState(initialData.position || '');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

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
            display_name: displayName,
            hr_focus: hrFocus,
            grad_year: gradYear,
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

    return (
        <form onSubmit={handleProfileCreation}
            className="flex max-w-xs flex-col gap-1 text-light dark:text-dark-text bg-white shadow-lg p-6 md:p-10">
            <h1>{isUpdating ? 'Update Profile' : 'Create Profile'}</h1>
            <input
                type="text"
                className="input-default"
                placeholder="Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
            />
            <input
                type="text"
                className="input-default"
                placeholder="HR Focus"
                value={hrFocus}
                onChange={(e) => setHrFocus(e.target.value)}
                required
            />
            <input
                type="text"
                className="input-default"
                placeholder="Graduation Year"
                value={gradYear}
                onChange={(e) => setGradYear(e.target.value)}
                required
            />
            <input
                type="text"
                className="input-default"
                placeholder="Industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                required
            />
            <input
                type="text"
                className="input-default"
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
            />
            <input
                type="text"
                className="input-default"
                placeholder="Position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
            />
            <button type="submit" className="button">{isUpdating ? 'Update Profile' : 'Create Profile'}</button>
            {message && <p>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default ProfileForm;