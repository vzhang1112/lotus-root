import {
  getAffiliationsByUserId,
  deleteAffiliation,
} from '../../shared/affiliationModel.js';

export async function onRequest({ request, params }) {
  const id = params.id;

  if (request.method === 'GET') {
    const { data, error } = await getAffiliationsByUserId(id);
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
    const { data, error } = await deleteAffiliation(id);
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

