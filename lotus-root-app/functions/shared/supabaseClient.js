import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = env.REACT_APP_SUPABASE_URL;
// const supabaseKey = env.REACT_APP_SUPABASE_ANON_KEY;

// export const supabase = createClient(supabaseUrl, supabaseKey);

export function createSupabase(env) {
    return createClient(env.REACT_APP_SUPABASE_URL, env.REACT_APP_SUPABASE_ANON_KEY);
}

export const getCurrentUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session ? session.user : null;
}