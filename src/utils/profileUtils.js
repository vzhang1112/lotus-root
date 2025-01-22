import { supabase } from './supabase.ts';

export const getProfile = async (userId) => {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', userId)
            .single();

        if (error) {
            console.error('Error fetching profile:', error);
            return { error };
        }

        console.log('Profile fetched:', data);
        return { data };
    } catch (error) {
        console.error('Unexpected error fetching profile:', error);
        return { error };
    }
};

export const createProfile = async (profileData) => {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .insert(profileData);

        if (error) {
            console.error('Error creating profile:', error);
            return { success: false, error };
        }

        console.log('Profile created:', data);
        return { success: true, data };
    } catch (error) {
        console.error('Unexpected error creating profile:', error);
        return { success: false, error };
    }
};

export const updateProfile = async (userId, profileData) => {
    console.log('Updating profile for user ID:', userId, 'with data:', profileData);

    try {
        const { error: updateError } = await supabase
            .from('profiles')
            .update(profileData)
            .eq('user_id', userId);

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