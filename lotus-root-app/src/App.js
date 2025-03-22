import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EmailVerification from './pages/EmailVerification.js';
import VerifyEmailRedirect from './components/VerifyEmailRedirect.js';
import ProfileInitialization from './pages/ProfileInitialization.js';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import NavBar from './components/NavBar';
import LandingPage from './pages/LandingPage.js';
import { getFromSupabase } from './utils/supabaseUtils.js';
import './input.css';
import './output.css';
import { AuthProvider, AuthContext } from './context/AuthContext.js';
import ProtectedRoute from './components/ProtectedRoute.js';

const App = () => {
    const { user, loading } = useContext(AuthContext);
    const [profileInitialized, setProfileInitialized] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (user && user.email_confirmed_at) {
                const profileResult = await getFromSupabase(user.id, "profiles");

                if (profileResult.success && profileResult.data) {
                    setProfileInitialized(true);
                }
            }
        };

        if (user) {
            fetchUserProfile();
        }
    }, [user]);

    if (loading) return <p>Loading...</p>;

    return (
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
                <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
                <Route path="/edit-profile" element={<ProtectedRoute element={EditProfile} />} />
                <Route path="/landing-page" element={<ProtectedRoute element={LandingPage} />} />
            </Routes>
        </Router>
    );
};

const AppWithProvider = () => (
    <AuthProvider>
        <App />
    </AuthProvider>
);

export default AppWithProvider;