<script context="module">
	import { get as getRequest } from '../../lib/api';

	export const load = async ({ params, fetch, session, stuff }) => {
		// TODO handle error by sending it to the page and renderin appropriate error message
		const { response, error } = await getRequest(fetch, `/api/playlists/${params.id}`);

		if (error) {
			return { status: 200, props: { playlist: {} } };
		}
		return { status: 200, props: { playlist: response } };
	};
</script>

<script>
	import SongList from '../../components/list/song.list.svelte';

	import { queue } from '../../stores/queue.store';
	import { play } from '../../stores/player.store';

	export let playlist;

	const playPlaylist = () => {
		const songs = playlist.songs;
		if (songs.length > 0) {
			queue.set(songs);
			play(songs[0]);
		}
	};
</script>

<svelte:head>
	<title>{playlist.name}</title>
</svelte:head>

<div class="p-4">
	<div>
		<a href="/" on:click|preventDefault={playPlaylist} class="w-full">
			{playlist.name}
		</a>
	</div>
	<SongList songs={playlist.songs} />
</div>
