import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
// import { getProfile } from '../utils/profileUtils.js';
import { getFromSupabase } from '../utils/supabaseUtils.js';

function Home() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) {
                setError("profile.js User not authenticated");
                return;
            }

            try {
                console.log('Fetching profile for user:', user.id);
                const profileResult = await getFromSupabase(user.id, "profiles");

                if (!profileResult.success) {
                    console.log('Error fetching profile:', profileResult.error);
                    setError('Error fetching profile: ' + profileResult.error.message);
                } else {
                    console.log('Profile fetched:', profileResult.data);
                    setProfile(profileResult.data);
                }
            } catch (error) {
                setError("Error fetching profile: " + error.message);
            }
        };

        fetchProfile();
    }, [user]);

    if (!profile) {
        return <p>Loading profile...</p>;
    }

    return (
        <body class="body-default">
            <div>
                {user ? (
                    <div>
                        <p>Home.js</p>
                        <h1 class="text-3xl">Welcome back, {profile.display_name}!</h1>
                        <button onClick={logout}>
                            Log out</button>
                    </div>
                ) : (
                    <div class="mt-16 sm:mt-20 md:mt-24 lg:mt-32 xl:mt-40 mx-auto max-w-4xl p-6">
                        <p>Home.js</p>
                        <h1 className="text-3xl">Welcome to Lotus Root!</h1>
                        <button onClick={() => navigate('/login')}>
                            Log in
                            </button>
                        <button onClick={() => navigate('/signup')}>
                            Sign up
                            </button>
                    </div>
                )}
            </div>
        </body>    
    );
}

export default Home;