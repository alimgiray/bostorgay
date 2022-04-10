import { writable } from 'svelte/store';

const API_URL = import.meta.env.VITE_API_URL;

export const currentSong = writable(null);
export const currentSource = writable('');
export const isPlaying = writable(false);
export const queue = writable([]);

export const play = (song) => {
	isPlaying.set(true);
	currentSong.set(song);
	currentSource.set(`${API_URL}${song.url}`);
};
