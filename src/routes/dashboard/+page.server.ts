import { getUserInfo } from '$lib/helpers';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const user = await getUserInfo(locals.userId);

	if (user === false) {
		throw error(500, 'Error fetching user information');
	}

	return user;
};
