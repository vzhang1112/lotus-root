import { createUser } from '../../shared/userModel.js';

export async function onRequestPost({ request }) {
  const { email, name } = await request.json();
  const { data, error } = await createUser(email, name);

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
