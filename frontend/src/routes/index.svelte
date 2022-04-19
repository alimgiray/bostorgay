<script context="module">
	import { get } from '../lib/api';
	export async function load({ params, fetch, session, stuff }) {
		const { response: artistResponse, error: artistError } = await get(
			fetch,
			'/api/artists/latest'
		);
		const { response: songsResponse, error: songsError } = await get(fetch, '/api/songs/latest');

		if (artistError || songsError) {
			return {
				status: 200,
				props: {
					songs: songsResponse ?? [],
					artists: artistResponse ?? []
				}
			};
		} else {
			return {
				status: 200,
				props: {
					songs: songsResponse,
					artists: artistResponse
				}
			};
		}
	}
</script>

<script>
	import Search from '../components/search.svelte';
	import SongList from '../components/list/song.list.svelte';
	import ArtistList from '../components/list/artist.list.svelte';

	import { getPlaylists } from '../stores/playlist.store';
	import { isLoggedIn } from '../stores/user.store';
	if ($isLoggedIn) {
		getPlaylists();
	}

	export let songs = [];
	export let artists = [];

	document.addEventListener('update-songs', (e) => {
		// @ts-ignore
		songs = e.detail?.songs;
	});
	document.addEventListener('update-artists', (e) => {
		// @ts-ignore
		artists = e.detail?.artists;
	});
</script>

<svelte:head>
	<title>Bostorgay</title>
</svelte:head>

<div class="p-4">
	<Search />
	<div>
		<SongList {songs} on:update-songs />
		<div class="text-lg font-bold text-orange-500">Artists</div>
		<ArtistList {artists} on:update-artists />
	</div>
</div>
