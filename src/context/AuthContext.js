import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabase.ts';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchAuth = async () => {
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            if (!userError && user) {
                console.log('User fetched:', user);
                setUser(user);
            } else {
                console.log('No user found');
                setUser(null);
            }
        };
        fetchAuth();

        // Listen for auth state changes
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                console.log('Auth state changed, user:', session.user);
                setUser(session.user);
            } else {
                console.log('Auth state changed, no user');
                setUser(null);
            }
        });

        // Cleanup subscription on unmount
        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    const login = async (email, password) => {
        const { error, data } = await supabase.auth.signInWithPassword({ email, password });
        if (!error) {
            console.log('User logged in:', data.user);
            setUser(data.user);
        }
        return error;
    };

    const signup = async (email, password) => {
        const { error, data } = await supabase.auth.signUp({ email, password });
        if (!error) {
            console.log('User signed up:', data.user);
            setUser(data.user);
        }
        return error;
    };

    const logout = async () => {
        await supabase.auth.signOut();
        console.log('User logged out');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};