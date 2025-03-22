import { createClient } from "@supabase/supabase-js";

// Check if running in a Node.js environment (backend)
if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
    // Load environment variables from .env.local file
    const dotenv = require('dotenv');
    dotenv.config({ path: './.env.local' });
}

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.SUPABASE_URL as string;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const getCurrentUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session ? session.user : null;
}