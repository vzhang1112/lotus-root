import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { supabase } from './utils/supabase.ts';
import Home from './pages/Home';
import Auth from './components/Auth';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Profile from './pages/Profile';
import ProfileForm from './components/ProfileForm';
import { getFromSupabase } from './utils/supabaseUtils.js';

const App = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profileInitialized, setProfileInitialized] = useState(false);
    const [swipeCardInitialized, setSwipeCardInitialized] = useState(false);

    useEffect(() => {
        const fetchUserAndProfile = async () => {
            const { data: { user }, error: userError } = await supabase.auth.getUser();

            if (userError) {
                console.error('Error fetching user:', userError.message);
                setLoading(false);
                return;
            }

            setUser(user);

            if (user && user.email_confirmed_at) {
                const profileResult = await getFromSupabase(user.id, "profiles");

                if (profileResult.success && profileResult.data) {
                    setProfileInitialized(true);
                }
            }

            if (user && user.profileResult) {
                const swipeCardResult = await getFromSupabase(user.id, "swipe_cards");

                if (swipeCardResult.success && swipeCardResult.data) {
                    setSwipeCardInitialized(true);
                }
            }

            setLoading(false);
        };

        fetchUserAndProfile();
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
                            profileInitialized ? (
                                <Profile />
                            ) : (
                                <Navigate to="/edit-profile" />
                            )
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    path="/edit-profile"
                    element={
                        user && user.email_confirmed_at ? (
                            <ProfileForm />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    path="/swipe-card"
                    element={
                        user && user.email_confirmed_at ? (
                            swipeCardInitialized ? (
                                <SwipeCard />
                            ) : (
                                <Navigate to="/edit-swipe-card" />
                            )
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    path="/edit-swipe-card"
                    element={
                        user && user.email_confirmed_at ? (
                            <SwipeCardForm />
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