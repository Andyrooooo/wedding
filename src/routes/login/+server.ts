import type { RequestHandler } from '@sveltejs/kit';
import dotenv from 'dotenv';
dotenv.config();

const USERNAME = process.env.ADMIN_USERNAME
const PASSWORD = process.env.ADMIN_PASSWORD

export const POST: RequestHandler = async ({ request, cookies }) => {
    const { username, password } = await request.json();
    console.log('USERNAME:', process.env.ADMIN_USERNAME);
    console.log('PASSWORD:', process.env.ADMIN_PASSWORD);

    if (username === USERNAME && password === PASSWORD) {
        // Set a simple cookie for demonstration (use secure session in production)
        cookies.set('admin_auth', 'true', { path: '/', httpOnly: true, sameSite: 'strict' });
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ success: false, error: 'Invalid credentials' }), { status: 401 });
    }
};