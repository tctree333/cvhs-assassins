import * as jose from 'jose';
import { JWT_SECRET, SENTRY_DSN } from '$env/static/private';

import type { Handle, HandleServerError } from '@sveltejs/kit';

import * as SentryNode from '@sentry/node';
import '@sentry/tracing';

SentryNode.init({
	dsn: SENTRY_DSN,
	tracesSampleRate: 1.0,
	// Add the Http integration for tracing
	integrations: [new SentryNode.Integrations.Http()]
});

SentryNode.setTag('svelteKit', 'server');

// use handleError to report errors during server-side data loading
export const handleError = (({ error, event }) => {
	SentryNode.captureException(error, { contexts: { sveltekit: { ...event } } });

	return {
		message: (error as { message: string }).message
	};
}) satisfies HandleServerError;

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
