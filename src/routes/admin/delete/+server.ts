import type { RequestHandler } from '@sveltejs/kit';
import { testPeople } from '$lib/testDB';

export const DELETE: RequestHandler = async ({ request }) => {
    try {
        const userToDelete = await request.json()
        let idToDelete = userToDelete.id;
        console.log(userToDelete, idToDelete)
        await testPeople.query('DELETE FROM testPeople WHERE id=?', [idToDelete]);
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "failed to delete guest" }), { status: 500 });
    }
};