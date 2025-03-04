import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase.ts';
import { Navigate } from 'react-router-dom';
import { getFromSupabase } from '../utils/supabaseUtils.js';

const SwipeCard = () => {
    const [user, setUser] = useState(null);
    const [swipe_card, setSwipeCard] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSwipeCard = async () => {
            const { data: { user }, error: userError } = await supabase.auth.getUser();

            if (userError) {
                setError('Error fetching user: ' + userError.message);
                return;
            }
            
            if (!user) {
                setError('User not authenticated');
                return;
            }

            setUser(user);

            const swipeCardResult = await getFromSupabase(user.id, "swipe_cards");

            if (!swipeCardResult.success) {
                setError('Error fetching swipe card: ' + swipeCardResult.error.message);
            } else {
                setSwipeCard(swipeCardResult.data);
            }
        };

        fetchSwipeCard();
    }, []);
    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }
    if (!swipe_card) {
        return <p>Loading...</p>;
    }
    
    return (
        <div>
            <h1>{swipe_card.role}</h1>
            <p>{swipe_card.availability}</p>
            <p>{swipe_card.question1 ? swipe_card.question1 : ''}</p>
            <p>{swipe_card.answer1 ? swipe_card.answer1 : ''}</p>
            <p>{swipe_card.question2 ? swipe_card.question2 : ''}</p>
            <p>{swipe_card.answer2 ? swipe_card.answer2 : ''}</p>
            <p>{swipe_card.question3 ? swipe_card.question3 : ''}</p>
            <p>{swipe_card.answer3 ? swipe_card.answer3 : ''}</p>
            <p>{swipe_card.personal_blurb ? swipe_card.personal_blurb : ''}</p>
            {user && user.id === swipe_card.user_id && (
                <button onClick={() => Navigate('/edit-swipe-card')}>Edit Swipe Card</button>
            )}
        </div>
    );
};

export default SwipeCard;