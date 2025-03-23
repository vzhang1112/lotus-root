import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
import AuthForm from '../components/AuthForm.js';
import { supabase } from '../utils/supabaseClient.js';

const SignUp = () => {
    const { signup } = useContext(AuthContext);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignUp = async (email, password) => {
        const { user, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setErrorMessage(error.message);
            return;
        }

        // Save the email to the user's profile
        const { data, error: profileError } = await supabase
            .from('profiles')
            .insert([{ user_id: user.id, email }]);

        if (profileError) {
            setErrorMessage(profileError.message);
            return;
        }

        navigate('/profile');
    };

    return <AuthForm isLogin={false} onSubmit={handleSignUp} errorMessage={errorMessage} />;
};

export default SignUp;