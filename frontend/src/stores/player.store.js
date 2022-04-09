import { writable } from 'svelte/store';

export const currentSong = writable(null);
export const isPlaying = writable(false);
export const queue = writable([]);

export const play = (song) => {
	isPlaying.set(true);
	currentSong.set(song);
};
