import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
import AuthForm from '../components/AuthForm.js';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (email, password) => {
        const error = await login(email, password);
        if (error) {
            console.error('Login error:', error);
            return;
        }
        navigate('/home');
    };

    return <AuthForm isLogin={true} onSubmit={handleLogin} />;
};

export default Login;