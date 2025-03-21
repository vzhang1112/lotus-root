import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const { user } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            element={
                user && user.email_confirmed_at ? (
                    <Component />
                ) : (
                    <Navigate to="/login" />
                )
            }
        />
    );
};

export default ProtectedRoute;
