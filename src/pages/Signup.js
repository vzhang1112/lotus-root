import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
import AuthForm from '../components/AuthForm.js';

const SignUp = () => {
    const { signup } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignUp = async (email, password) => {
        const error = await signup(email, password);
        if (error) {
            console.error('Sign up error:', error);
            return;
        }
        navigate('/email-verification');
    };

    return <AuthForm isLogin={false} onSubmit={handleSignUp} />;
};

export default SignUp;