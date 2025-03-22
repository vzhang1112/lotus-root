import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
import AuthForm from '../components/AuthForm.js';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (email, password) => {
        const error = await login(email, password);
        if (error) {
            setErrorMessage(error);
            return;
        }
        navigate('/');
    };

    return <AuthForm isLogin={true} onSubmit={handleLogin} errorMessage={errorMessage} />;
};

export default Login;