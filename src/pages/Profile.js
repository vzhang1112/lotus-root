import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase.ts';
import { useBackNavigation } from '../utils/navigationUtils';
import { getFromSupabase } from '../utils/supabaseUtils.js';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const handleBack = useBackNavigation();

    useEffect(() => {
        const fetchProfile = async () => {
            const { data: { user }, error: userError } = await supabase.auth.getUser();

            if (userError) {
                setError('Error fetching user: ' + userError.message);
                return;
            }

            if (!user) {
                setError('User not authenticated');
                return;
            }

            const profileResult = await getFromSupabase(user.id, "profile");

            if (!profileResult.success) {
                setError('Error fetching profile: ' + profileResult.error.message);
            } else {
                setProfile(profileResult.data);
            }
        };

        fetchProfile();
    }, []);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!profile) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <button type="button" onClick={handleBack}>Back</button>
            <h1>{profile.display_name}</h1>
            <p>{profile.bio}</p>
            <p>{profile.grad_year}</p>
            <p>{profile.industry}</p>
            <p>{profile.company}</p>
            <p>{profile.position}</p>
            <button onClick={() => Navigate('/edit-profile')}>Edit Profile</button>
        </div>
    );
};

export default Profile;