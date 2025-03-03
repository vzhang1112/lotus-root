import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabase.ts';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) {
                console.error('Error fetching user:', error.message);
            } else {
                setUser(user);
            }
            setLoading(false);
        };

        fetchUser();

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user || null);
        });

        return () => {
            if (authListener && authListener.subscription && typeof authListener.subscription.unsubscribe === 'function') {
                authListener.subscription.unsubscribe();
            }
        };
    }, []);

    const login = async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            console.error('Error logging in:');
            return error.message;
        }
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        return null;
    };

    const signup = async (email, password) => {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
            console.error('Error signing up:');
            return error.message;
        }
        const { data: { user } } = await supabase.auth.getUser();
        return null;
    };

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error logging out:', error.message);
        } else {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};