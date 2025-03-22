import { createSupabase } from '../supabaseClient.js';

export async function getProfile(userId, env) {
  const supabase = createSupabase(env);
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  return { data, error };
}

export async function createProfile(profileData, env) {
  const supabase = createSupabase(env);
  const { data, error } = await supabase
    .from('profiles')
    .insert(profileData);

  return { data, error };
}

export async function updateProfile(userId, profileData, env) {
  const supabase = createSupabase(env);
  const { error } = await supabase
    .from('profiles')
    .update(profileData)
    .eq('user_id', userId);

  return { success: !error, error };
}

