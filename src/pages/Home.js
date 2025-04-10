import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
import { getFromSupabase } from '../utils/supabaseUtils.js';

function Home() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) {
                setError("User not authenticated");
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
            console.log('error:' + error);
        };

        fetchProfile();
    }, [user]);

    return (
        <div class="body-default">
            <div class="h-screen md:flex">
                {/* <div class="md:flex w-1/2">
                    <div class="steam-pixelart"></div>
                    <div class="coffee-pixelart"></div>
                </div> */}
                <div className="md:flex w-1/2">
                    {user ? (
                        <div>
                            <p>Home.js</p>
                            <h1 class="text-3xl">Welcome back, {profile ? profile.display_name : 'Guest'}!</h1>
                            <button onClick={logout}>
                                Log out
                            </button>
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
            </div>
        </div>    
    );
}

export default Home;