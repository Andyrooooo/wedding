import type { RequestHandler } from '@sveltejs/kit';
import { people } from '$lib/db';

export const PUT: RequestHandler = async ({ request }) => {
    try {
        const { id, first_name, last_name, rsvp_status } = await request.json();
        // Update the user in the database
        await people.query(
            'UPDATE people SET first_name=?, last_name=?, rsvp_status=? WHERE id=?',
            [first_name, last_name, rsvp_status, id]
        );
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "failed to update guest" }), { status: 500 });
    }
};