import type { RequestHandler } from '@sveltejs/kit';
import { testPeople } from '$lib/testDB';

export const GET: RequestHandler = async () => {
    try {
        const [rows] = await testPeople.query('SELECT * FROM testPeople');
        return new Response(JSON.stringify(rows), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response(JSON.stringify({ error: "failed to grab people" }), {status: 500});
    }
};