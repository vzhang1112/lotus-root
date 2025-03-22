import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';

const ProtectedRoute = ({ element: Component }) => {
    const { user } = useContext(AuthContext);

    return user && user.email_confirmed_at ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;