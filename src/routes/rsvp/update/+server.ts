import type { RequestHandler } from '@sveltejs/kit';
import { people } from '$lib/db';

export const PUT: RequestHandler = async ({ request }) => {
    const guests = await request.json();

    // Validate input
    if (!Array.isArray(guests)) {
        return new Response(JSON.stringify({ error: 'Invalid data' }), { status: 400 });
    }

    // Example using a MySQL client (e.g., mysql2 or prisma)
    try {
        for (const guest of guests) {
            // Update each guest's RSVP status by ID
            // Replace this with your actual DB update logic
            await people.query(
                'UPDATE people SET rsvp_status = ? WHERE id = ?',
                [guest.rsvp_status, guest.id]
            );
        }
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 });
    }
};