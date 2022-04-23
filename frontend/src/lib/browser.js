import { browser } from '$app/env';
import NoSleep from 'nosleep.js';

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

export function preventSleeping() {
	if (browser) {
		const noSleep = new NoSleep();
		noSleep.enable();
	}
}
