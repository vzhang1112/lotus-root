import { supabase } from '../../supabase.ts';

export const createAffiliation = async (user_id, organization, searchable) => {
    const { data, error } = await supabase
        .from('affiliations')
        .insert([{ user_id, organization, searchable }]);
    return { data, error };
};

export const getAffiliationsByUserId = async (user_id) => {
    const { data, error } = await supabase
        .from('affiliations')
        .select('*')
        .eq('user_id', user_id);
    return { data, error };
};

export const deleteAffiliation = async (id) => {
    const { data, error } = await supabase
        .from('affiliations')
        .delete()
        .eq('id', id);
    return { data, error };
};
