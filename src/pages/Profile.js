import React, { useEffect, useState, useContext } from 'react';
import { supabase } from '../utils/supabase.ts';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
import { getFromSupabase } from '../utils/supabaseUtils.js';
import ProfileCard from '../components/ProfileCard.js';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) {
                setError("profile.js User not authenticated");
                console.log("User not authenticated: ", user);
                return;
            }

            try {
                const { data: profileData, error: profileError } = await getFromSupabase(user.id, "profiles");

                if (profileError) {
                    setError('Error fetching profile: ' + profileError.message);
                } else {
                    setProfile(profileData);
                }
            } catch (error) {
                setError('Error fetching profile: ' + error.message);
            }
        };

        fetchProfile();
    }, [user]);

    const handleEditProfile = () => {
        navigate('/edit-profile');
    };

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div className="body-default">
            <div className="h-screen md:flex">
                <div className="md:flex w-1/2 items-center justify-center">
                    {profile ? (
                        <div>
                            <ProfileCard profile={profile} />
                            {profile.linkedin_url && (
                                <p>
                                    LinkedIn: <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer">{profile.linkedin_url}</a>
                                </p>
                            )}
                            <br></br>
                            <button onClick={handleEditProfile}>Edit profile</button>
                        </div>
                    ) : (
                        <div>
                            <button onClick={handleEditProfile}>Create profile</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;