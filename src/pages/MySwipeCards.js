import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase.ts';
import { Navigate } from 'react-router-dom';
import SwipeCard from '../components/SwipeCard.js';

const MySwipeCards = () => {
    const [swipeCards, setSwipeCards] = useState([]);
    const [error, setError] = useState('');

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

            const { mentorData, mentorError } = await supabase
                .from('swipe_cards')
                .select('*')
                .eq('user_id', user.id)
                .eq('role', 'mentor');

            if (mentorError) {
                setError('Error fetching mentor swipe card: ' + mentorError.message);
                return;
            }

            const { seekerData, seekerError } = await supabase
            .from('swipe_cards')
            .select('*')
            .eq('user_id', user.id)
            .eq('role', 'seeker');

            if (seekerError) {
                setError('Error fetching mentor swipe card: ' + mentorError.message);
                return;
            }

            const combinedData = [...mentorData, ...seekerData];
            setSwipeCards(combinedData);
        };
        fetchSwipeCards();
    }, []);

    const handleCreateMentorCard = () => {
        Navigate('/create-swipe-card', {
            state: {
                role: "mentor",
                availability: "available",
            },
        });
    };

    const handleCreateSeekerCard = () => {
        Navigate('/create-swipe-card', {
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
            <div>
                <p>Create your own swipe card!</p>
                <button onClick={handleCreateMentorCard}>Become a mentor</button>
                <button onClick={handleCreateSeekerCard}>Become a seeker</button>
                <button></button>
            </div>
        );
    }

    return (
        <div className="my-swipe-cards">
            {swipeCards.map((swipeCard) => (
                <SwipeCard key={swipeCard.id} swipeCard={swipeCard} />
            ))}
        </div>
    );
};

export default MySwipeCards;