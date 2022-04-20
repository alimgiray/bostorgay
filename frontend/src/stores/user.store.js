import { writable } from 'svelte/store';
import { createNotification } from './notification.store';
import { browserRemove, browserSet, browserGet } from '$lib/browser';
import { post, put } from '$lib/api';

let user = browserGet('user');
export const isLoggedIn = writable(user ? true : false);

export const login = async (email, password) => {
	const { response, error } = await post(fetch, `/api/users/login`, { email, password });
	if (!error) {
		browserSet('user', response);
		isLoggedIn.set(true);
		return true;
	} else {
		createNotification(true, error.description);
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
		createNotification(true, error.description);
		return false;
	}
};

export const logout = () => {
	isLoggedIn.set(false);
	browserRemove('user');
};

export const updatePassword = async (oldPassword, newPassword) => {
	const { error } = await put(fetch, `/api/users/password`, {
		oldPassword,
		newPassword
	});
	if (!error) {
		return true;
	} else {
		createNotification(true, error.description);
		return false;
	}
};
