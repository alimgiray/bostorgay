<script context="module">
	import { isLoggedIn } from '../../stores/user.store';
	import { get } from 'svelte/store';

	export async function load({ params, fetch, session, stuff }) {
		const loggedIn = get(isLoggedIn);
		if (!loggedIn) {
			return { status: 302, redirect: '/' };
		}
		return {
			status: 200
		};
	}
</script>

<script>
	import { create } from '../../stores/playlist.store';
	import { goto } from '$app/navigation';

	let name = '';

	const handleNewPlaylist = async () => {
		const { playlist, success } = await create(name);
		if (success) {
			goto(`/playlist/${playlist.id}`);
		}
	};
</script>

<div class="p-4">
	<div>New Playlist</div>
	<div>
		<form on:submit|preventDefault={handleNewPlaylist}>
			<div class="mt-2">
				<input type="text" bind:value={name} placeholder="Playlist name..." />
			</div>
			<div class="mt-2 flex justify-end">
				<button class="border px-4 py-1">Create</button>
			</div>
		</form>
	</div>
</div>
