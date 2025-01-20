import { supabase } from '../utils/supabase.ts';

export const createSwipeCard = async (swipeCardData) => {
    const { user_id, role, availability, question1, answer1, question2, answer2,
        question3, answer3 } = swipeCardData;

    console.log('Creating swipe card with data:', swipeCardData);

    try {
        const { error: insertError } = await supabase
            .from('swipecards')
            .insert([
                {
                    user_id: user_id,
                    role: role,
                    availbility: availability,
                    question1: question1,
                    answer1: answer1,
                    question2: question2,
                    answer2: answer2,
                    question3: question3,
                    answer3: answer3
                },
            ]);

        if (insertError) {
            console.error('Error creating swipe card:', insertError);
            return { success: false, error: insertError };
        } else {
            console.log('Swipe card created successfully');
            return { success: true };
        }
    } catch (error) {
        console.error('Unexpected error creating swipe card:', error);
        return { success: false, error };
    }
};

// TODO: going to use this file for functions to edit existing swipecards
