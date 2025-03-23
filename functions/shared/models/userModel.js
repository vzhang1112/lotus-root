import { createSupabase } from '../supabaseClient.js';

export const createUser = async (email, name, env) => {
    const supabase = createSupabase(env);
    const { data, error } = await supabase
        .from('users')
        .insert([{ email, name }]);
    return { data, error };
};

export const getUserById = async (id, env) => {
    const supabase = createSupabase(env);
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();
    return { data, error };
};

export const updateUser = async (id, updates, env) => {
    const supabase = createSupabase(env);
    const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', id);
    return { data, error };
};

export const deleteUser = async (id, env) => {
    const supabase = createSupabase(env);
    const { data, error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);
    return { data, error };
};
