import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
import AuthForm from '../components/AuthForm.js';

const SignUp = () => {
    const { signup } = useContext(AuthContext);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignUp = async (email, password) => {
        const error = await signup(email, password);
        if (error) {
            setErrorMessage(error);
            return;
        }
        navigate(`/email-verification?email=${encodeURIComponent(email)}`);
    };

    return <AuthForm isLogin={false} onSubmit={handleSignUp} errorMessage={errorMessage} />;
};

export default SignUp;