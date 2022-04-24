import { writable, get as getItems } from 'svelte/store';
import { get } from '$lib/api';
import { createNotification } from './notification.store';

export const artists = writable([]);
export const isSearchResults = writable(false);
export const showMoreArtistsButton = writable(true);

export const getArtists = async () => {
	const { response, error } = await get(fetch, '/api/artists/latest');
	if (!error) {
		artists.set(response);
	} else {
		createNotification(true, error.description);
	}
};

export const searchArtists = async (searchTerm) => {
	if (searchTerm) {
		get(fetch, `/api/artists/search?q=${searchTerm}`).then((result) => {
			const { response, error } = result;
			if (!error) {
				artists.set(response);
				isSearchResults.set(true);
			} else {
				createNotification(true, error.description);
			}
		});
	} else {
		get(fetch, '/api/artists/latest').then((result) => {
			const { response, error } = result;
			if (!error) {
				artists.set(response);
				isSearchResults.set(false);
			} else {
				createNotification(true, error.description);
			}
		});
	}
};

export const loadMoreArtists = async () => {
	const loadedArtists = await getItems(artists);
	get(fetch, `/api/artists/latest?from=${loadedArtists.length + 20}`).then((result) => {
		const { response, error } = result;
		if (!error) {
			if (response?.length > 0) {
				artists.update((artists) => [...artists, ...response]);
				isSearchResults.set(false);
			} else {
				showMoreArtistsButton.set(false);
			}
		} else {
			createNotification(true, error.description);
		}
	});
};
