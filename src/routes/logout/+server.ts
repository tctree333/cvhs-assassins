import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	return new Response(undefined, {
		status: 302,
		headers: {
			location: '/',
			'Set-Cookie': `session=""; Path=/; Max-Age=-1; HttpOnly; Secure; SameSite=Lax;` // 7 days
		}
	});
};
