import { supabase } from './supabase.ts';

export const createSwipeCard = async (swipeCardData) => {
    const { user_id, role, availability, question1, answer1, question2, answer2,
        question3, answer3, personal_blurb } = swipeCardData;

    console.log('Creating swipe card with data:', swipeCardData);

    try {
        const { error: insertError } = await supabase
            .from('swipecards')
            .insert([
                {
                    user_id: user_id,
                    role: role,
                    availability: availability,
                    question1: question1,
                    answer1: answer1,
                    question2: question2,
                    answer2: answer2,
                    question3: question3,
                    answer3: answer3,
                    personal_blurb: personal_blurb
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


export const updateSwipeCard = async (swipeCardData) => {
    const { user_id, role, availability, question1, answer1, question2, answer2,
        question3, answer3, personal_blurb } = swipeCardData;

    console.log('Updating swipe card for user ID:', user_id, 'with data:', swipeCardData);

    try {
        const { error: updateError } = await supabase
            .from('swipecards')
            .update([
                {
                    role: role,
                    availability: availability,
                    question1: question1,
                    answer1: answer1,
                    question2: question2,
                    answer2: answer2,
                    question3: question3,
                    answer3: answer3,
                    personal_blurb: personal_blurb
                },
            ])
            .eq('user_id', user_id);

        if (updateError) {
            console.error('Error updating swipe card:', updateError);
            return { success: false, error: updateError };
        } else {
            console.log('Swipe card updated successfully');
            return { success: true };
        }
    } catch (error) {
        console.error('Unexpected error updating swipe card:', error);
        return { success: false, error };
    }
};