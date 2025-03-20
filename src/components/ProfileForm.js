import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
import { createProfile, updateProfile } from '../utils/profileUtils.js';
import { HR_FIELDS, INDUSTRY } from '../utils/constants.ts';
import { isValidUrl } from '../utils/validation.js';

const ProfileForm = ({ initialData = {}, isUpdating = false }) => {
    const { user } = useContext(AuthContext);
    const [displayName, setDisplayName] = useState(initialData.display_name || '');
    const [hrFocus, setHrFocus] = useState(initialData.hr_focus || '');
    const [gradYear, setGradYear] = useState(initialData.grad_year || '');
    const [industry, setIndustry] = useState(initialData.industry || '');
    const [company, setCompany] = useState(initialData.company || '');
    const [position, setPosition] = useState(initialData.position || '');
    const [linkedinUrl, setLinkedinUrl] = useState(initialData.linkedin_url || '');
    const [shareEmail, setShareEmail] = useState(initialData.share_email || false);
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

        if (linkedinUrl && !isValidUrl(linkedinUrl, 'linkedin.com')) {
            setError('LinkedIn URL must be a valid URL and include "linkedin.com"');
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
            linkedin_url: linkedinUrl,
            share_email: shareEmail,
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

    const handleLinkedinBlur = () => {
        if (linkedinUrl && !isValidUrl(linkedinUrl, 'linkedin.com')) {
            setError('LinkedIn URL must be a valid URL and include "linkedin.com"');
        } else {
            setError('');
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
            <select
                className="input-default"
                value={hrFocus}
                onChange={(e) => setHrFocus(e.target.value)}
                required
            >
                <option value="" disabled>Select HR Focus</option>
                {HR_FIELDS.map((category) => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
            <input
                type="text"
                className="input-default"
                placeholder="Graduation Year"
                value={gradYear}
                onChange={(e) => setGradYear(e.target.value)}
                required
            />
            <select
                className="input-default"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                required
            >
                <option value="" disabled>Select Industry</option>
                {INDUSTRY.map((category) => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
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
            <input
                type="url"
                className="input-default"
                placeholder="LinkedIn URL"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                onBlur={handleLinkedinBlur}
            />
            <label className="flex items-center mt-4">
                <input
                    type="checkbox"
                    checked={shareEmail}
                    onChange={(e) => setShareEmail(e.target.checked)}
                />
                <span className="ml-2">Share my email on my profile</span>
            </label>
            <button type="submit" className="button">{isUpdating ? 'Update Profile' : 'Create Profile'}</button>
            {message && <p>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default ProfileForm;