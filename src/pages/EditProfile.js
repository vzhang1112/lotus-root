import React, { useEffect, useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
import ProfileForm from '../components/ProfileForm.js';

const EditProfile = () => {
    const { user } = useContext(AuthContext);
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    // const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) {
                setError("User not authenticated");
                setLoading(false);
                return;
            }

            try {
                console.log("Fetching profile for user:", user.id, "type:", typeof user.id);
                const profileResponse = await fetch(`/api/profile/${user.id}`);
                console.log("profile response:", profileResponse);
                const contentType = profileResponse.headers.get('Content-Type');
                console.log("get content type:", contentType);
                const profileResult = await profileResponse.json();
                console.log("Profile result:", profileResult);

                if (profileResult.success && profileResult.data) {
                    setProfileData(profileResult.data);
                } else {
                    setError("Error fetching profile: " + profileResult + (profileResult.error?.message || 'Unknown error'));
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

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <h1>Edit Profile</h1>
            <ProfileForm initialData={profileData} isUpdating={true} />
        </div>
    );
};

export default EditProfile;