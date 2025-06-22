import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
    const isAuthed = cookies.get('admin_auth');
    if (!isAuthed) {
        throw redirect(302, '/login');
    }
    // Optionally, return data for the page here
    return {};
};