import { supabase } from '../../supabase.ts';

export const createReferenceRequest = async (requester_id, organization, is_open) => {
    const { data, error } = await supabase
        .from('reference_requests')
        .insert([{ requester_id, organization, is_open }]);
    return { data, error };
};

export const getReferenceRequests = async () => {
    const { data, error } = await supabase
        .from('reference_requests')
        .select('*');
    return { data, error };
};
