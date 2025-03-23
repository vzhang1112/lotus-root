import { createSupabase } from '../supabaseClient.js';

export const createAffiliation = async (user_id, organization, searchable, env) => {
    const supabase = createSupabase(env);
    const { data, error } = await supabase
        .from('affiliations')
        .insert([{ user_id, organization, searchable }]);
    return { data, error };
};

export const getAffiliationsByUserId = async (user_id, env) => {
    const supabase = createSupabase(env);
    const { data, error } = await supabase
        .from('affiliations')
        .select('*')
        .eq('user_id', user_id);
    return { data, error };
};

export const deleteAffiliation = async (id, env) => {
    const supabase = createSupabase(env);
    const { data, error } = await supabase
        .from('affiliations')
        .delete()
        .eq('id', id);
    return { data, error };
};
