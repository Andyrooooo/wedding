import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
    const isLoggedIn = cookies.get('admin_auth') === 'true';
    return { isLoggedIn };
};