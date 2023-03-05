import * as jose from 'jose';
import { validateUser } from '$lib/helpers';
import { JWT_SECRET } from '$env/static/private';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	const user = formData.get('user');
	const password = formData.get('password');

	if (!user || !password) {
		return new Response(undefined, {
			status: 302,
			headers: { location: '/login?error=Missing%20username%20or%20password' }
		});
	}

	const validUser = await validateUser(user as string, password as string);

	if (validUser === false) {
		return new Response(undefined, {
			status: 302,
			headers: {
				location: '/login?error=Incorrect%20username%20or%20password'
			}
		});
	}

	const token = await new jose.SignJWT({ usr: validUser.id })
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.sign(new TextEncoder().encode(JWT_SECRET));

	return new Response(undefined, {
		status: 302,
		headers: {
			location: '/dashboard',
			'Set-Cookie': `session=${token}; Path=/; Max-Age=604800; HttpOnly; Secure; SameSite=Lax;` // 7 days
		}
	});
};
