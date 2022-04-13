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
	export let playlist;
</script>

<svelte:head>
	<title>{playlist.name}</title>
</svelte:head>

<div class="p-4">
	<div>{playlist.name}</div>
	<SongList songs={playlist.songs} />
</div>
