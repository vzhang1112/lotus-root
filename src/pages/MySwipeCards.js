import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase.ts';
import { useNavigate } from 'react-router-dom';
import SwipeCard from '../components/SwipeCard.js';

const MySwipeCards = () => {
    const [swipeCards, setSwipeCards] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
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
                setError('Error fetching mentor swipe card: ' + mentorError.message);
                return;
            }


            // Ensure mentorData and seekerData are defined
            if (!mentorData || !seekerData) {
                setError('Error: mentorData or seekerData is undefined');
                return;
            }
            
            const combinedData = [...mentorData, ...seekerData];
            setSwipeCards(combinedData);
        };
        fetchSwipeCards();
    }, []);

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

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!swipeCards.length) {
        return (
            <body class="body-default">
                <div>
                    <p>Create your own swipe card!</p>
                    <button onClick={handleCreateMentorCard}>
                        Become a mentor</button>
                    <button onClick={handleCreateSeekerCard}>
                        Become a seeker</button>
                </div>
            </body>
            
        );
    }

    return (
        <body class="body-default">
            <div>
                {swipeCards.map((swipeCard) => (
                    <SwipeCard key={swipeCard.id} swipeCard={swipeCard} />
                ))}
            </div>
        </body>
    );
};

export default MySwipeCards;