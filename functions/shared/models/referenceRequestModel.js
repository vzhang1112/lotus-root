import { createSupabase } from '../supabaseClient.js';

export const createReferenceRequest = async (
    requester_id, organization, is_open, env) => {
    const supabase = createSupabase(env);
    const { data, error } = await supabase
        .from('reference_requests')
        .insert([{ requester_id, organization, is_open }]);
    return { data, error };
};

export const getReferenceRequests = async (env) => {
    const supabase = createSupabase(env);
    const { data, error } = await supabase
        .from('reference_requests')
        .select('*');
    return { data, error };
};
