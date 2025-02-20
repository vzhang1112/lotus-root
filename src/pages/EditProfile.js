import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
import ProfileForm from '../components/ProfileForm.js';
import { getProfile } from '../utils/profileUtils.js';

const EditProfile = () => {
    const { user } = useContext(AuthContext);
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
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
                const profileResult = await getProfile(user.id);
                console.log("Profile result:", profileResult);

                if (profileResult.success && profileResult.data) {
                    setProfileData(profileResult.data);
                } else {
                    setError("Error fetching profile: " + profileResult.error.message);
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
        return <p>Loading profile...</p>;
    }

    if (!user) {
        return <p>User not authenticated</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <ProfileForm initialData={profileData} isUpdating={true} />
        </div>
    );
};

export default EditProfile;