import * as jose from 'jose';
import { validateUser } from '$lib/helpers';
import { JWT_SECRET } from '$env/static/private';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ cookies, request }) => {
		const formData = await request.formData();
		const user = formData.get('user');
		const password = formData.get('password');

		if (!user || !password) {
			return fail(400, { errorMessage: 'Missing user or password' });
		}

		const validUser = await validateUser(user as string, password as string);

		if (validUser === false) {
			return fail(400, { errorMessage: 'Incorrect user or password' });
		}

		const token = await new jose.SignJWT({ usr: validUser.id })
			.setProtectedHeader({ alg: 'HS256' })
			.setIssuedAt()
			.sign(new TextEncoder().encode(JWT_SECRET));

		cookies.set('session', token, { path: '/' });

		throw redirect(302, '/dashboard');
	}
} satisfies Actions;
