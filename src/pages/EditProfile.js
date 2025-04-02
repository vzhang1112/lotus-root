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
            console.log("user inside fetchprofile: ", user);
            if (!user) {
                setError("User not authenticated");
                setLoading(false);
                return;
            }

            try {
                console.log("Fetching profile for user:", user.id, "type:", typeof user.id);
                const profileResponse = await fetch(`/api/profile/${user.id}`);
                console.log("just made request to:", `/api/profile/${user.id}`);
                console.log("raw response object:", profileResponse);

                if (!profileResponse.ok) {
                    const text = await profileResponse.text(); // Try to read the error response safely
                    throw new Error(`Failed to fetch profile: ${profileResponse.status} ${text}`);
                  }
                  
                const contentType = profileResponse.headers.get('Content-Type');
                console.log("get content type:", contentType);

                const text = await profileResponse.text();
                console.log("raw response body:", text);
                // const profileResult = await profileResponse.json();

                let profileResult;
                try {
                    profileResult = JSON.parse(text);
                    console.log("parsed json:", profileResult);
                } catch (err) {
                    console.error("failed to parse json:", err.message);
                    throw new Error("server did not return valid json");
                }
                console.log("Profile result:", profileResult);
                console.log("Profile result data:", profileResult.data);

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