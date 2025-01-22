import { supabase } from "./supabase.ts"

export const getFromSupabase = async (userId, tableName) => {
    try {
        const { data, error } = await supabase
            .from(tableName)
            .select('*')
            .eq('user_id', userId);

        if (error) {
            return { success: false, error };
        }

        if (data.length === 0) {
            return { success: false, error: { message: 'No rows returned' } };
        }

        if (data.length > 1) {
            return { success: false, error: { message: 'Multiple rows returned' } };
        }

        return { success: true, data: data[0] };
    } catch (error) {
        return { success: false, error };
    }
};