import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { supabase } from './utils/supabase.ts'; // Adjust the import path as needed
import Home from './pages/Home';
import Auth from './components/Auth';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Profile from './components/Profile';
import CreateProfile from './components/ProfileForm';

const App = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
            setLoading(false);
        });

        return () => subscription?.unsubscribe?.();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <Router>
            <Routes>
                {/* public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={!user ? <Auth /> : <Navigate to="/profile" />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* protected routes */}
                <Route
                    path="/profile"
                    element={
                        user && user.email_confirmed_at ? (
                            <Profile />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    path="/create-profile"
                    element={
                        user && user.email_confirmed_at ? (
                            <CreateProfile />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;