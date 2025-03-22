import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../../../shared/supabase.ts';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
        };

        getSession();

        const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
            setUser(session?.user ?? null);
        });

        // return () => {
        //     authListener.unsubscribe();
        // };

        return () => {
            if (authListener && typeof authListener.unsubscribe === 'function') {
                authListener.unsubscribe();
            }
        };
    }, []);

    const signup = async (email, password) => {
        const { user, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            return error.message;
        }

        // Save the email to the user's profile
        const { data, error: profileError } = await supabase
            .from('profiles')
            .insert([{ user_id: user.id, email }]);

        if (profileError) {
            return profileError.message;
        }

        return null;
    };

    const login = async (email, password) => {
        const { user, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return error.message;
        }

        return null;
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};