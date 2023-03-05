import { getUserInfo } from '$lib/helpers';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import * as SentryNode from '@sentry/node';

export const load: PageServerLoad = async ({ locals, request }) => {
	const user = await getUserInfo(locals.userId);

	if (user === false) {
		SentryNode.captureMessage('Error fetching user information', {
			contexts: { sveltekit: { locals, request } }
		});
		throw error(500, 'Error fetching user information');
	}

	return user;
};
