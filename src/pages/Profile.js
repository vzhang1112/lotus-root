import React, { useEffect, useState, useContext } from 'react';
import { supabase } from '../utils/supabase.ts';
import { useNavigate } from 'react-router-dom';
import SwipeCard from '../components/SwipeCard.js';
import { AuthContext } from '../context/AuthContext.js';
import { getFromSupabase } from '../utils/supabaseUtils.js';
import ProfileCard from '../components/ProfileCard.js';

const Profile = () => {
    const { user, logout } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [swipeCards, setSwipeCards] = useState([]);
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

        const fetchSwipeCards = async () => {
            const { data: { user }, error: userError } = await supabase.auth.getUser();

            if (userError) {
                setError('Error fetching user: ' + userError.message);
                return;
            }

            if (!user) {
                setError('User not authenticated');
                return;
            }

            const { data: mentorData, error: mentorError } = await supabase
                .from('swipecards')
                .select('*')
                .eq('user_id', user.id)
                .eq('role', 'mentor');

            if (mentorError) {
                setError('Error fetching mentor swipe card: ' + mentorError.message);
                return;
            }

            const { data: seekerData, error: seekerError } = await supabase
                .from('swipecards')
                .select('*')
                .eq('user_id', user.id)
                .eq('role', 'seeker');

            if (seekerError) {
                setError('Error fetching seeker swipe card: ' + seekerError.message);
                return;
            }

            if (!mentorData || !seekerData) {
                setError('Error: mentorData or seekerData is undefined');
                return;
            }

            const combinedData = [...mentorData, ...seekerData];
            setSwipeCards(combinedData);
        };

        fetchProfile();
        fetchSwipeCards();
    }, [user]);

    const handleCreateMentorCard = () => {
        navigate('/edit-swipe-card', {
            state: {
                role: "mentor",
                availability: "available",
            },
        });
    };

    const handleCreateSeekerCard = () => {
        navigate('/edit-swipe-card', {
            state: {
                role: "seeker",
                availability: "available",
            },
        });
    };

    const handleEditProfile = () => {
        navigate('/edit-profile');
    };

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <body class="body-default">
            <div class="h-screen md:flex">
                <div class="md:flex w-1/2 items-center justify-center">
                    {profile ? (
                        <div>
                            <ProfileCard profile={profile} />
                            <br></br>
                            <button onClick={handleEditProfile}>Edit profile</button>
                        </div>
                    ) : (
                        <p>Loading profile...</p>
                    )}
                </div>
                <div className="md:flex w-1/2 min-h-svh items-center justify-center">
                    {swipeCards.length ? (
                        swipeCards.map((swipeCard) => (
                            <SwipeCard key={swipeCard.id} swipeCard={swipeCard} />
                        ))
                    ) : (
                        <div>
                            <p>Create your own swipe card!</p>
                            <button onClick={handleCreateMentorCard}>Become a mentor</button>
                            <br></br>
                            <button onClick={handleCreateSeekerCard}>Become a seeker</button>
                        </div>
                    )}
                </div>
            </div>
        </body>
    );
};

export default Profile;