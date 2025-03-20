import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabase.ts';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const session = supabase.auth.session();
        setUser(session?.user ?? null);

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            authListener.unsubscribe();
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
        const { user, error } = await supabase.auth.signIn({
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