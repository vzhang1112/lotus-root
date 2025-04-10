import { createClient } from "@supabase/supabase-js";

export function createSupabase(env) {
    return createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
}

export const getCurrentUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session ? session.user : null;
}