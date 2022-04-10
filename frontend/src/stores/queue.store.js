import { writable } from 'svelte/store';

export const queue = writable([]);
export const visible = writable(false);

export const prepend = (song) => {
	queue.update((q) => [song, ...q]);
};

export const append = (song) => {
	queue.update((q) => [...q, song]);
};
