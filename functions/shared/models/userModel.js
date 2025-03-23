import { supabase } from '../../supabase.ts';

export const createUser = async (email, name) => {
    const { data, error } = await supabase
        .from('users')
        .insert([{ email, name }]);
    return { data, error };
};

export const getUserById = async (id) => {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();
    return { data, error };
};

export const updateUser = async (id, updates) => {
    const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', id);
    return { data, error };
};

export const deleteUser = async (id) => {
    const { data, error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);
    return { data, error };
};
