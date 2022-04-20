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
	import { Icon } from '@steeze-ui/svelte-icon';
	// @ts-ignore
	import { Play } from '@steeze-ui/heroicons';

	import SongList from '../../components/list/song.list.svelte';
	import { playPlaylist } from '../../stores/playlist.store';

	export let playlist;

	const play = () => {
		playPlaylist(playlist);
	};
</script>

<svelte:head>
	<title>{playlist.name}</title>
</svelte:head>

<div class="p-4">
	<div>
		<a href="/" on:click|preventDefault={play} class="w-full flex">
			<div>
				<Icon src={Play} theme="solid" class="w-6 h-6" />
			</div>
			<div class="ml-2">
				{playlist.name}
			</div>
		</a>
	</div>
	<SongList songs={playlist.songs} />
</div>
