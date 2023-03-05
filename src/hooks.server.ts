import * as jose from 'jose';
import { JWT_SECRET } from '$env/static/private';

import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionCookie = event.request.headers
		.get('cookie')
		?.split(';')
		.reduce((acc, curr) => {
			const [key, value] = curr.split('=');
			acc.set(key.trim(), value.trim());
			return acc;
		}, new Map<string, string>())
		.get('session');

	let payload;
	if (sessionCookie) {
		payload = (
			await jose.jwtVerify(sessionCookie, new TextEncoder().encode(JWT_SECRET), {
				maxTokenAge: '7 days'
			})
		).payload;
	}
	const loginRoute = event.url.pathname.includes('login');
	if (!sessionCookie || !payload || !payload.usr) {
		if (loginRoute) {
			return await resolve(event);
		}
		return new Response(undefined, { status: 302, headers: { location: '/login' } });
	}
	if (loginRoute) {
		return new Response(undefined, { status: 302, headers: { location: '/dashboard' } });
	}

	event.locals.userId = payload.usr as string;
	return await resolve(event);
};
