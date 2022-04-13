<script context="module">
	import { isLoggedIn } from '../../stores/user.store';
	import { get } from 'svelte/store';
	import { get as getRequest } from '../../lib/api';
	import { browserGet } from '$lib/browser';

	export async function load({ params, fetch, session, stuff }) {
		if (!get(isLoggedIn)) {
			return { status: 302, redirect: '/' };
		}

		const user = browserGet('user');
		if (!user) {
			return { status: 302, redirect: '/' };
		}
		const username = user.username;
		// TODO handle error by sending it to the page and renderin appropriate error message
		const { response, error } = await getRequest(fetch, `/api/playlists/${username}`);

		if (error) {
			return { status: 200, props: { playlists: [] } };
		}
		return { status: 200, props: { playlists: response } };
	}
</script>

<script>
	import PlaylistItem from '../../components/list/playlist.item.svelte';
	export let playlists = [];
</script>

<svelte:head>
	<title>Playlists</title>
</svelte:head>

<div class="p-4">
	<div class="pb-2 flex justify-between">
		<div>Playlists</div>
		<div><a href="/playlist/new">Create</a></div>
	</div>
	{#each playlists as playlist}
		<PlaylistItem {playlist} />
	{/each}
</div>
