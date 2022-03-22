<script context="module">
	import { get } from '../lib/api';
	export async function load({ params, fetch, session, stuff }) {
		const { response, error } = await get(fetch, '/api/songs/latest');

		if (error) {
			return {
				status: 200,
				props: {
					songs: []
				}
			};
		} else {
			return {
				status: 200,
				props: {
					songs: response
				}
			};
		}
	}
</script>

<script>
	import Search from '../components/search.svelte';
	import SongList from '../components/list/song.list.svelte';
	import ArtistList from '../components/list/artist.list.svelte';

	export let songs = [];
	let artists = [];

	let mode = 'song';
</script>

<svelte:head>
	<title>Qaytarma</title>
</svelte:head>

<div class="p-4">
	<Search />
	<div>
		{#if mode === 'song'}
			<SongList {songs} />
		{:else}
			<ArtistList {artists} />
		{/if}
	</div>
</div>
