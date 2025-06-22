import type { RequestHandler } from '@sveltejs/kit';
import { people } from '$lib/db';

export const GET: RequestHandler = async () => {
    try {
        const [rows] = await people.query('SELECT * FROM people');
        return new Response(JSON.stringify(rows), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response(JSON.stringify({ error: "failed to grab people" }), {status: 500});
    }
};