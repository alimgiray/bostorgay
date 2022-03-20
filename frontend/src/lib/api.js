import { browserGet } from './browser';

export async function post(fetch, url, body) {
	body = JSON.stringify(body);
	const headers = { 'Content-Type': 'application/json' };

	const user = browserGet('user');
	if (user) {
		headers['Authorization'] = `Bearer ${user.token}`;
	}

	const result = await fetch(url, {
		method: 'POST',
		body,
		headers
	});

	const data = await result.json();

	if (result.ok) {
		return { response: data, error: null };
	} else {
		return { response: null, error: data };
	}
}
