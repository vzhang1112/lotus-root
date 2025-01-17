import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { supabase } from './utils/supabase.ts'; // Adjust the import path as needed
import Home from './pages/Home';
import Auth from './components/Auth';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Profile from './pages/Profile'; // Adjust the import path as needed
import ProfileForm from './components/ProfileForm';
import { getProfile } from './utils/profileUtils'; // Adjust the import path as needed

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
                const profileResult = await getProfile(user.id);

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
                                <Navigate to="/create-profile" />
                            )
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    path="/create-profile"
                    element={
                        user && user.email_confirmed_at ? (
                            <ProfileForm />
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