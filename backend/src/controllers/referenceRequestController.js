import { createReferenceRequest, getReferenceRequests } from '../models/referenceRequestModel.js';

export async function handleReferenceRequest(request) {
    const { pathname } = new URL(request.url);

    if (request.method === 'POST' && pathname === '/reference-requests') {
        const referenceRequestData = await request.json();
        const { requester_id, organization, is_open } = referenceRequestData;
        const { data, error } = await createReferenceRequest(requester_id, organization, is_open);
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

    if (request.method === 'GET' && pathname === '/reference-requests') {
        const { data, error } = await getReferenceRequests();
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