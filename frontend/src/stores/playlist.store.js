import { writable, get } from 'svelte/store';
import { post, get as getRequest, put } from '$lib/api';
import { createNotification } from './notification.store';
import { queue } from './queue.store';
import { play } from './player.store';
import { isLoggedIn } from './user.store';

export const playlists = writable([]);
export const currentPlaylist = writable(null);

export const create = async (name) => {
	const { response, error } = await post(fetch, `/api/playlists`, { name });
	if (!error) {
		return { playlist: response, success: true };
	} else {
		return { playlist: null, success: false };
	}
};

export const getPlaylists = async () => {
	const { response, error } = await getRequest(fetch, `/api/playlists`);
	if (!error) {
		playlists.set(response);
		return true;
	} else {
		createNotification(true, error.description);
		return false;
	}
};

export const addSongToPlaylist = async (playlistID, songID) => {
	const lists = get(playlists);
	const playlist = lists.find((p) => p.id === playlistID);
	if (playlist) {
		const songs = playlist.songs.map((s) => s.id);
		songs.push(songID);
		const { error } = await put(fetch, `/api/playlists/${playlist.id}`, {
			name: playlist.name,
			songs
		});
		if (!error) {
			getPlaylists();
			return true;
		} else {
			createNotification(true, error.description);
			return false;
		}
	}
};

export const removeSongFromPlaylist = async (playlistID, songID) => {
	const lists = get(playlists);
	const playlist = lists.find((p) => p.id === playlistID);
	if (playlist) {
		const songs = playlist.songs.filter((s) => s.id !== songID).map((s) => s.id);
		const { error } = await put(fetch, `/api/playlists/${playlist.id}`, {
			name: playlist.name,
			songs
		});
		if (!error) {
			getPlaylists();
			return true;
		} else {
			createNotification(true, error.description);
			return false;
		}
	}
};

export const playPlaylist = (playlist) => {
	const songs = playlist.songs;
	if (songs.length > 0) {
		queue.set(songs);
		play(songs[0]);
		currentPlaylist.set(playlist);
	}
};

const loggedIn = get(isLoggedIn);
if (loggedIn) {
	getPlaylists();
}
