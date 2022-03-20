import { browser } from '$app/env';

export function browserSet(key, value) {
	if (browser) {
		localStorage.setItem(key, JSON.stringify(value));
	}
}

export function browserGet(key) {
	if (browser) {
		const item = localStorage.getItem(key);
		if (item) {
			return JSON.parse(item);
		}
	}
	return null;
}

export function browserRemove(key) {
	if (browser) {
		localStorage.removeItem(key);
	}
}
