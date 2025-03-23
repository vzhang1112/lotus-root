import {
  getAffiliationsByUserId,
  deleteAffiliation,
} from '../../shared/models/affiliationModel.js';

export async function onRequest({ request, params, env }) {
  const id = params.id;

  if (request.method === 'GET') {
    const { data, error } = await getAffiliationsByUserId(id, env);
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

  if (request.method === 'DELETE') {
    const { data, error } = await deleteAffiliation(id, env);
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

  return new Response('Method Not Allowed', { status: 405 });
}

