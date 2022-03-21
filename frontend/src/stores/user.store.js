import { writable } from 'svelte/store';
import { browserRemove, browserSet, browserGet } from '$lib/browser';
import { post } from '$lib/api';

let user = browserGet('user');
export const isLoggedIn = writable(user ? true : false);

export const login = async (email, password) => {
	const { response, error } = await post(fetch, `/api/users/login`, { email, password });
	if (!error) {
		browserSet('user', response);
		isLoggedIn.set(true);
		return true;
	} else {
		// TODO handle error
		console.log(error);
		return false;
	}
};

export const register = async (email, username, password) => {
	const { response, error } = await post(fetch, `/api/users/register`, {
		email,
		username,
		password
	});
	if (!error) {
		browserSet('user', response);
		isLoggedIn.set(true);
		return true;
	} else {
		// TODO handle error
		console.log(error);
		return false;
	}
};

export const logout = () => {
	isLoggedIn.set(false);
	browserRemove('user');
};
