import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../utils/supabase';

function Home() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await getCurrentUser();
            if (!currentUser) {
                navigate('/login');
            } else {
                setUser(currentUser);
            }
        };
        fetchUser();
    }, [navigate]);

    return user ? (
        <div>
            <h1>Welcome, {user.email}!</h1>
            <button onClick={() => supabase.auth.signOut().then(() => navigate('/login'))}>
                Logout
            </button>
        </div>
    ) : (
        <p>Loading...</p>
    );
}

export default Home;