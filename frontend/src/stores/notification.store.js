import { writable } from 'svelte/store';

export const notifications = writable([]);

export const createNotification = (isError, text) => {
	const id = Math.floor(Math.random() * 10000);
	const notification = {
		id,
		isError,
		text,
		timeout: 3000
	};
	notifications.update((all) => [...all, notification]);
	setTimeout(() => removeNotification(notification.id), notification.timeout);
};

export const removeNotification = (id) => {
	notifications.update((all) => all.filter((n) => n.id !== id));
};
