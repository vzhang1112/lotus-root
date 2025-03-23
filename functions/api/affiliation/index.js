import { createAffiliation } from '../../shared/models/affiliationModel.js';

export async function onRequestPost({ request, env }) {
  const body = await request.json();
  const { user_id, organization, searchable } = body;
  const { data, error } = await createAffiliation(user_id, organization, searchable, env);

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

