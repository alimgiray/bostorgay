import { writable, get as getItems } from 'svelte/store';
import { get } from '$lib/api';
import { createNotification } from './notification.store';

export const songs = writable([]);
export const isSearchResults = writable(false);

export const getSongs = async () => {
	const { response, error } = await get(fetch, '/api/songs/latest');
	if (!error) {
		songs.set(response);
	} else {
		createNotification(true, error.description);
	}
};

export const searchSongs = async (searchTerm) => {
	if (searchTerm) {
		get(fetch, `/api/songs/search?q=${searchTerm}`).then((result) => {
			const { response, error } = result;
			if (!error) {
				songs.set(response);
				isSearchResults.set(true);
			} else {
				createNotification(true, error.description);
			}
		});
	} else {
		get(fetch, '/api/songs/latest').then((result) => {
			const { response, error } = result;
			if (!error) {
				songs.set(response);
				isSearchResults.set(false);
			} else {
				createNotification(true, error.description);
			}
		});
	}
};

export const loadMoreSongs = async () => {
	const loadedSongs = await getItems(songs);
	get(fetch, `/api/songs/latest?from=${loadedSongs.length + 20}`).then((result) => {
		const { response, error } = result;
		if (!error) {
			if (response?.length > 0) {
				songs.update((songs) => [...songs, ...response]);
				isSearchResults.set(false);
			}
		} else {
			createNotification(true, error.description);
		}
	});
};
