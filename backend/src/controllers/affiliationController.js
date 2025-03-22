import { createAffiliation, getAffiliationsByUserId, deleteAffiliation } from '../models/affiliationModel.js';

export async function handleAffiliationRequest(request) {
    const { pathname } = new URL(request.url);

    if (request.method === 'POST' && pathname === '/affiliations') {
        const affiliationData = await request.json();
        const { user_id, organization, searchable } = affiliationData;
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

    if (request.method === 'GET' && pathname.startsWith('/affiliations/')) {
        const user_id = pathname.split('/')[2];
        const { data, error } = await getAffiliationsByUserId(user_id);
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

    if (request.method === 'DELETE' && pathname.startsWith('/affiliations/')) {
        const id = pathname.split('/')[2];
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

    return new Response('Not Found', { status: 404 });
}