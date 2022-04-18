<script context="module">
	import { isLoggedIn } from '../../stores/user.store';
	import { get } from 'svelte/store';
	import { get as getRequest } from '../../lib/api';

	export const load = async ({ fetch, session }) => {
		const loggedIn = get(isLoggedIn);
		if (!loggedIn) {
			return { status: 302, redirect: '/' };
		}

		// TODO handle error by sending it to the page and renderin appropriate error message
		const { response, error } = await getRequest(fetch, `/api/playlists`);

		if (error) {
			return { status: 200, props: { playlists: [] } };
		}
		return { status: 200, props: { playlists: response } };
	};
</script>

<script>
	import PlaylistItem from '../../components/list/playlist.item.svelte';
	export let playlists = [];
</script>

<svelte:head>
	<title>Playlists</title>
</svelte:head>

<div class="p-4">
	<div class="pb-2 flex justify-center">
		<div class="underline">Playlists</div>
	</div>
	{#each playlists as playlist}
		<PlaylistItem {playlist} />
	{/each}
	<div class="flex justify-end mt-4">
		<a href="/playlist/new" class="text-zinc-200">Create New</a>
	</div>
</div>
