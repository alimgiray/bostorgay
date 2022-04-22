import { writable, get } from 'svelte/store';
import { browserSet, browserGet } from '$lib/browser';

import { play, stop } from './player.store';

export const queue = writable([]);
export const visible = writable(false);

const savedQueue = browserGet('queue');
if (savedQueue) {
	if (savedQueue.length > 0) {
		queue.set(savedQueue);
	}
}

export const prepend = (song) => {
	if (exists(song)) {
		return;
	}
	queue.update((q) => [song, ...q]);
	browserSet('queue', get(queue));
};

export const append = (song) => {
	if (exists(song)) {
		return;
	}
	queue.update((q) => [...q, song]);
	browserSet('queue', get(queue));
	const songs = get(queue);
	if (songs.length === 1 && songs[0].id !== song.id) {
		play(song);
	}
};

export const remove = (song) => {
	if (!exists(song)) {
		return;
	}
	queue.update((songs) => songs.filter((s) => s.id !== song.id));
	browserSet('queue', get(queue));
};

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

export const playPreviousSong = (currentSong) => {
	if (!currentSong) return;

	const songs = get(queue);
	let previousSong = null;
	for (let i = 0; i < songs.length; i++) {
		if (songs[i].id === currentSong.id) {
			if (i > 0) {
				previousSong = songs[i - 1];
			}
		}
	}
	if (previousSong) {
		play(previousSong);
	}
};

export const exists = (song) => {
	const songs = get(queue);
	return songs.some((s) => s.id === song.id);
};
