import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { supabase } from './utils/supabase.ts';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext.js';
import SwipingPage from './pages/SwipingPage.js';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EmailVerification from './pages/EmailVerification.js';
import VerifyEmailRedirect from './components/VerifyEmailRedirect.js';
import ProfileInitialization from './pages/ProfileInitialization.js';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
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
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/email-verification" element={<EmailVerification />} />
                    <Route path="/profile-initialization" element={<ProfileInitialization />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/verify-email-redirect" element={<VerifyEmailRedirect />} />

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
                                <EditProfile />
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
                        path="/edit-swipe-card"
                        element={
                            user && user.email_confirmed_at ? (
                                <SwipeCardForm />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/swipe-on-people"
                        element={
                            user && user.email_confirmed_at ? (
                                <SwipingPage />
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