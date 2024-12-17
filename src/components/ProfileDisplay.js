import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "../utils/supabase.ts";

const ProfileDisplay = () => {
    const [profile, setProfile] = useState(null);
    // stores profile data
    const [loading, setLoading] = useState(true);
    // handles loading state

    // fetch prfoile of the logged-in user
    const fetchProfile = async () => {
        setLoading(true);
        try {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (session) {
                const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('user_id', session.user.id)
                .single();
                if (error) throw error;
                setProfile(data);
            }
        } catch (error) {
            console.error('Error fetching profile:', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    if (loading) return <p>Loading profile...</p>
    if (!profile) return <p>No profile found, please create one</p>

    return (
        <div style={styles.container}>
            <img
                src={profile.profile_picture_url || 'https://via.placeholder.com/150'}
                alt="Profile"
                style={styles.image}
            />
            <h2>{profile.name || 'no name given'}</h2>
            <h3>{profile.grad_year || 'no grad year given'}</h3>
            <h4>{profile.industry || 'no industry given'}</h4>
            <h4>{profile.company || 'no company given'}</h4>
            <h4>{profile.position || 'no position given'}</h4>
            <p>{profile.bio || 'no profile given'}</p>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        maxWidth: '400px',
        margin: '0 auto',
    },
    image: {
        borderRadius: '50%',
        width: '150px',
        height: '150px',
        marginBottom: '20px',
    },
};

export default ProfileDisplay;