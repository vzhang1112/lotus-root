import { createProfile } from '../../../shared/models/profileModel.js';

export async function onRequestPost({ request, env }) {

  const body = await request.json();
  const { profileData } = body;
  
  const { data, error } = await createProfile(profileData, env);

  if (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ success: true, data }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

