import React, { useState } from 'react';
import { supabase } from '../utils/supabase.ts';

const Profile = () => {
    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');
    const [gradYear, setGradYear] = useState('');
    const [industry, setIndustry] = useState('');
    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');
    /**
     * Handles the submission of the profile form.
     * 
     * This function checks if a user is logged in, fetches the existing profile from the Supabase database,
     * and either updates the profile if it exists or creates a new profile if it doesn't.
     * 
     * @param {Event} e - The event object from the form submission.
     * 
     * @returns {Promise<void>} - A promise that resolves when the profile has been successfully created or updated.
     * 
     * @async
     * @function handleProfileSubmit
     * 
     * @description
     * 1. Prevents the default form submission behavior.
     * 2. Retrieves the currently logged-in user from Supabase authentication.
     * 3. Logs an error and returns if no user is logged in.
     * 4. Fetches the existing profile from the 'profiles' table in Supabase.
     * 5. Logs an error and returns if there is an error fetching the profile (excluding 'PGRST116' error code).
     * 6. If an existing profile is found, updates the profile with the new data.
     * 7. Logs an error if there is an error updating the profile, otherwise logs a success message.
     * 8. If no existing profile is found, inserts a new profile with the provided data.
     * 9. Logs an error if there is an error creating the profile, otherwise logs a success message.
     */
    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        const user = supabase.auth.user();

        if (!user) {
            console.error('No user logged in');
            return;
        }

        const { data: existingProfile, error: fetchError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
            console.error('Error fetching profile:', fetchError);
            return;
        }

        if (existingProfile) {
            const { error: updateError } = await supabase
                .from('profiles')
                .update({
                    display_name: displayName,
                    bio: bio,
                    grad_year: gradYear,
                    industry: industry,
                    company: company,
                    position: position,
                })
                .eq('id', user.id);

            if (updateError) {
                console.error('Error updating profile:', updateError);
            } else {
                console.log('Profile updated successfully');
            }
        } else {
            const { error: insertError } = await supabase
                .from('profiles')
                .insert([
                    {
                        id: user.id,
                        display_name: displayName,
                        bio: bio,
                        grad_year: gradYear,
                        industry: industry,
                        company: company,
                        position: position,
                    },
                ]);

            if (insertError) {
                console.error('Error creating profile:', insertError);
            } else {
                console.log('Profile created successfully');
            }
        }
    };

    return (
        <form onSubmit={handleProfileSubmit}>
            <input
                type="text"
                placeholder="Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
            />
            <input
                type="text"
                placeholder="Graduation Year"
                value={gradYear}
                onChange={(e) => setGradYear(e.target.value)}
            />
            <input
                type="text"
                placeholder="Industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
            />
            <input
                type="text"
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />
            <input
                type="text"
                placeholder="Position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
            />
            <button type="submit">Save Profile</button>
        </form>
    );
};

export const createProfile = async (user, profileData) => {
    const { displayName, bio, gradYear, industry, company, position } = profileData;

    const { error: insertError } = await supabase
        .from('profiles')
        .insert([
            {
                id: user.id,
                display_name: displayName,
                bio: bio,
                grad_year: gradYear,
                industry: industry,
                company: company,
                position: position,
            },
        ]);

    if (insertError) {
        console.error('Error creating profile:', insertError);
        return { success: false, error: insertError };
    } else {
        console.log('Profile created successfully');
        return { success: true };
    }
};

export default Profile;