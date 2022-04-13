import { writable } from 'svelte/store';

const API_URL = import.meta.env.VITE_API_URL;

import { exists, prepend, visible } from './queue.store';

export const currentSong = writable(null);
export const src = writable('');

export const isPlaying = writable(false);

export const currentTime = writable(0);
export const totalTime = writable(0);

export const play = (song) => {
	isPlaying.set(true);
	currentSong.set(song);
	src.set(`${API_URL}${song.url}`);

	if (!exists(song)) {
		prepend(song);
		visible.set(true);
	}
};

// Stop playing songs
export const stop = () => {
	isPlaying.set(false);
	currentSong.set(null);
	src.set('');
};
