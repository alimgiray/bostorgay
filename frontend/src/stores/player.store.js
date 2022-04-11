import { get, writable } from 'svelte/store';

const API_URL = import.meta.env.VITE_API_URL;

import { queue, prepend } from './queue.store';

export const currentSong = writable(null);
export const src = writable('');

export const isPlaying = writable(false);

export const currentTime = writable(0);
export const totalTime = writable(0);

export const play = (song) => {
	isPlaying.set(true);
	currentSong.set(song);
	src.set(`${API_URL}${song.url}`);

	if (!existsInQueue(song)) {
		prepend(song);
	}
};

// Stop playing songs
export const stop = () => {
	isPlaying.set(false);
	currentSong.set(null);
	src.set('');
};

const existsInQueue = (song) => {
	const songs = get(queue);
	return songs.some((s) => s.id === song.id);
};
