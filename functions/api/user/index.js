import { createUser } from '../../shared/models/userModel.js';

export async function onRequestPost({ request, env }) {
  const { email, name } = await request.json();
  const { data, error } = await createUser(email, name, env);

  if (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }

  return new Response(JSON.stringify({ success: true, data }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
