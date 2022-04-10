import { writable } from 'svelte/store';

export const queue = writable([]);
export const visible = writable(false);

export const prepend = async (song) => {
	queue.update((q) => [song, ...q]);
};

export const append = async (song) => {
	queue.update((q) => [...q, song]);
};
