import { getUserById, updateUser, deleteUser } from '../../shared/models/userModel.js';

export async function onRequest({ request, params, env }) {
  const id = params.id;

  if (request.method === 'GET') {
    const { data, error } = await getUserById(id, env);
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

  if (request.method === 'PUT') {
    const updates = await request.json();
    const { data, error } = await updateUser(id, updates, env);
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
    const { data, error } = await deleteUser(id, env);
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

