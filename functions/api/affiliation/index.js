import { createAffiliation } from '../../shared/affiliationModel.js';

export async function onRequestPost({ request }) {
  const { user_id, organization, searchable } = await request.json();
  const { data, error } = await createAffiliation(user_id, organization, searchable);

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

