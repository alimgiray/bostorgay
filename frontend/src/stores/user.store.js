import { writable } from 'svelte/store';

export const isLoggedIn = writable(false);
export const username = writable('');
export const token = writable('');

export const login = async (email, password) => {
	// TODO login
	console.log(email);
	console.log(password);
	isLoggedIn.set(true);
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
	token.set('');
	localStorage.removeItem('username');
	localStorage.removeItem('token');
};
