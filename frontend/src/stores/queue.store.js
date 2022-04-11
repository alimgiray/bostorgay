import { writable, get } from 'svelte/store';

import { play, stop } from './player.store';

export const queue = writable([]);
export const visible = writable(false);

export const prepend = (song) => {
	queue.update((q) => [song, ...q]);
};

export const append = (song) => {
	queue.update((q) => [...q, song]);
};

// TODO maybe use iterators??
export const playNextSong = (currentSong) => {
	if (!currentSong) {
		stop();
		return;
	}
	const songs = get(queue);
	let nextSong = null;
	for (let i = 0; i < songs.length; i++) {
		if (songs[i].id === currentSong.id) {
			if (i < songs.length - 1) {
				nextSong = songs[i + 1];
			}
		}
	}
	if (nextSong) {
		play(nextSong);
	} else {
		stop();
	}
};
