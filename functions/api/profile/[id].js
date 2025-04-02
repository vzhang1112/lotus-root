import {
  getProfile,
  updateProfile
} from '../../shared/models/profileModel.js';
export async function onRequest({ request, params, env }) {
  const userId = params.id;
  console.log('userId', userId);
  console.log('userId type:', typeof userId);
  console.log("ENV CHECK:", env);

  if (request.method === 'GET') {
    console.log("Running Supabase profile query for userId:", userId);
    const { data, error } = await getProfile(userId, env);
    if (error) {
      return new Response(JSON.stringify({ success: false, error: error.message || 'Unknown error'}), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return new Response(JSON.stringify({ success: true, data }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (request.method === 'PUT') {
    const profileData = await request.json();
    const { success, error } = await updateProfile(userId, profileData, env);
    if (!success) {
      return new Response(JSON.stringify({ success: false, error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response('Method Not Allowed', { status: 405 });
}

