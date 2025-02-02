import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { supabase } from './utils/supabase.ts';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext.js';
import Auth from './components/Auth';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Profile from './pages/Profile';
import ProfileForm from './components/ProfileForm';
import MySwipeCards from './pages/MySwipeCards.js'
import SwipeCardForm from './components/SwipeCardForm.js';
import NavBar from './components/NavBar';
import LandingPage from './pages/LandingPage.js';
import { getFromSupabase } from './utils/supabaseUtils.js';
import './input.css';
import './output.css';

const App = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profileInitialized, setProfileInitialized] = useState(false);

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

            setLoading(false);
        };

        fetchUserAndProfile();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <AuthProvider>
            <Router>
                <NavBar />
                <Routes>
                    {/* public routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Auth initialIsLogin={true} />} />
                    <Route path="/signup" element={<Auth initialIsLogin={false} />} />
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
                        path="/landing-page" 
                        element={
                            user && user.email_confirmed_at ? (
                                <LandingPage />
                            ) : (
                                <Navigate to="/" />
                            )
                        } 
                    />

                    {/* swipecard related routes */}
                    <Route
                        path="/my-swipe-cards"
                        element={
                            user && user.email_confirmed_at ? (
                                <MySwipeCards />
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
        </AuthProvider>
    );
};

export default App;