import { createUser, getUserById, updateUser, deleteUser } from '../models/userModel.js';

export async function handleUserRequest(request) {
    const { pathname } = new URL(request.url);

    if (request.method === 'POST' && pathname === '/users') {
        const userData = await request.json();
        const { email, name } = userData;
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

    if (request.method === 'GET' && pathname.startsWith('/users/')) {
        const id = pathname.split('/')[2];
        const { data, error } = await getUserById(id);
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

    if (request.method === 'PUT' && pathname.startsWith('/users/')) {
        const id = pathname.split('/')[2];
        const updates = await request.json();
        const { data, error } = await updateUser(id, updates);
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

    if (request.method === 'DELETE' && pathname.startsWith('/users/')) {
        const id = pathname.split('/')[2];
        const { data, error } = await deleteUser(id);
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

    return new Response('Not Found', { status: 404 });
}