/**
 * @fileoverview This file contains utility functions for managing user profiles in the database.
 * It provides functions to create, update, and fetch user profiles using Supabase as the backend.
 * 
 * Functions:
 * - createProfile: Creates a new user profile in the database.
 * - updateProfile: Updates an existing user profile in the database.
 * - getProfile: Retrieves a user profile from the database by user ID.
 * 
 * Each function handles errors and returns a promise that resolves to an object indicating success or failure.
 * 
 * @module utils/profileUtils
 */


import { supabase } from './supabase.ts';

/**
 * Updates the profile of a user in the database.
 *
 * @param {Object} user - The user object containing user details.
 * @param {Object} profileData - The profile data to update.
 * @param {string} profileData.displayName - The display name of the user.
 * @param {string} profileData.hrFocus - The HR focus of the user.
 * @param {number} profileData.gradYear - The graduation year of the user.
 * @param {string} profileData.industry - The industry the user works in.
 * @param {string} profileData.company - The company the user works for.
 * @param {string} profileData.position - The position of the user in the company.
 * @returns {Promise<Object>} A promise that resolves to an object indicating the success or failure of the update operation.
 * @returns {Promise<Object.success>} A boolean indicating if the update was successful.
 * @returns {Promise<Object.error>} An error object if the update failed.
 */
export const createProfile = async (profileData) => {
    const { user_id, displayName, hrFocus, gradYear, industry, company, position } = profileData;

    console.log('Creating profile with data:', profileData);

    try {
        const { error: insertError } = await supabase
            .from('profiles')
            .insert([
                {
                    user_id: user_id,
                    display_name: displayName,
                    hr_focus: hrFocus,
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
    } catch (error) {
        console.error('Unexpected error creating profile:', error);
        return { success: false, error };
    }
};

/**
 * Updates the profile of a user in the database.
 *
 * @param {string} user_id - The ID of the user whose profile is to be updated.
 * @param {Object} profileData - The profile data to update.
 * @param {string} profileData.displayName - The display name of the user.
 * @param {string} profileData.hrFocus - The HR focus of the user.
 * @param {number} profileData.gradYear - The graduation year of the user.
 * @param {string} profileData.industry - The industry the user works in.
 * @param {string} profileData.company - The company the user works for.
 * @param {string} profileData.position - The position of the user in the company.
 * @returns {Promise<Object>} A promise that resolves to an object indicating the success or failure of the update operation.
 * @returns {Promise<Object.success>} A boolean indicating if the update was successful.
 * @returns {Promise<Object.error>} An error object if the update failed.
 */
export const updateProfile = async (user_id, profileData) => {
    const { displayName, hrFocus, gradYear, industry, company, position } = profileData;

    console.log('Updating profile for user ID:', user_id, 'with data:', profileData);

    try {
        const { error: updateError } = await supabase
            .from('profiles')
            .update({
                display_name: displayName,
                hr_focus: hrFocus,
                grad_year: gradYear,
                industry: industry,
                company: company,
                position: position,
            })
            .eq('user_id', user_id);

        if (updateError) {
            console.error('Error updating profile:', updateError);
            return { success: false, error: updateError };
        } else {
            console.log('Profile updated successfully');
            return { success: true };
        }
    } catch (error) {
        console.error('Unexpected error updating profile:', error);
        return { success: false, error };
    }
};
