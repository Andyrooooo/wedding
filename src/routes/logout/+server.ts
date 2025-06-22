import type { RequestHandler } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
    cookies.set('admin_auth', '', {
        path: '/',
        expires: new Date(0),
        httpOnly: true,
        sameSite: 'strict'
    });
    throw redirect(302, '/');
};