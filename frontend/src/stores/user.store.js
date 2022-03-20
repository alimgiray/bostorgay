import { writable } from 'svelte/store';
import { browserRemove, browserSet, browserGet } from '$lib/browser';
import { post } from '$lib/api';

const API_URL = import.meta.env.VITE_API_URL;

let user = browserGet('user');
export const isLoggedIn = writable(user ? true : false);
export const username = writable(user ? user.username : '');

export const login = async (email, password) => {
	const { response, error } = await post(fetch, `${API_URL}/api/users/login`, { email, password });
	if (!error) {
		browserSet('user', response);
		isLoggedIn.set(true);
		username.set(response.username);
		return true;
	} else {
		// TODO handle error
		console.log(error);
		return false;
	}
};

export const register = async (email, username, password) => {
	// TODO register
	console.log(email);
	console.log(username);
	console.log(password);
	isLoggedIn.set(true);
};

export const logout = () => {
	isLoggedIn.set(false);
	username.set('');
	browserRemove('user');
};
