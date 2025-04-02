import { createSupabase } from '../supabaseClient.js';

export async function getProfile(userId, env) {
  console.log('getProfile called with:', userId);
  const supabase = createSupabase(env);
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId);

  console.log("Supabase query result:", data, error);
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

