import {
  createReferenceRequest,
  getReferenceRequests,
} from '../../shared/models/referenceRequestModel.js';

export async function onRequest({ request, env }) {
  if (request.method === 'POST') {
    const { requester_id, organization, is_open } = await request.json();
    const { data, error } = await createReferenceRequest(requester_id, organization, is_open, env);

    if (error) {
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        {
          headers: { 'Content-Type': 'application/json' },
          status: 500,
        }
      );
    }

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (request.method === 'GET') {
    const { data, error } = await getReferenceRequests(env);

    if (error) {
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        {
          headers: { 'Content-Type': 'application/json' },
          status: 500,
        }
      );
    }

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response('Method Not Allowed', { status: 405 });
}

