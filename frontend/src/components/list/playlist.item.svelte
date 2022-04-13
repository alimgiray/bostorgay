<script>
	import { Icon } from '@steeze-ui/svelte-icon';
	// @ts-ignore
	import { Pencil } from '@steeze-ui/heroicons';

	import { queue } from '../../stores/queue.store';
	import { play } from '../../stores/player.store';

	export let playlist = {};

	const playPlaylist = () => {
		const songs = playlist.songs;
		if (songs.length > 0) {
			queue.set(songs);
			play(songs[0]);
		}
	};
</script>

<div class="flex py-2 px-1 border-b border-b-zinc-600 text-sm hover:bg-zinc-900">
	<a href={`/playlist/${playlist.id}`} class="flex min-w-fit pr-2">
		<div class="w-full my-auto align-middle cursor-pointer">
			<Icon src={Pencil} theme="solid" class="color-gray-900 w-5 h-5" />
		</div>
	</a>
	<a href="/" on:click|preventDefault={playPlaylist} class="w-full">
		{playlist.name}
	</a>
</div>
