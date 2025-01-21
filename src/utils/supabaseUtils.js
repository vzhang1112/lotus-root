import { supabase } from "./supabase.ts"

export const getFromSupabase = async(userId, tableName)  => {
    try { 
        const { data, error } = await supabase
            .from(tableName)
            .select('*')
            .eq('id', userId);

        // const { data, error } = await query;

        if (error) {
            console.error(`Error fetching ${tableName}:`, error);
            return { success: false, error };
        } else {
            return { success: true, data };
        }
    } catch (error) {
        console.error(`Unexpected error fetching ${tableName}:`, error);
        return { success: false, error };
    }
};