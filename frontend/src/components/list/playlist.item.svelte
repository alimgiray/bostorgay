<script>
	import { Icon } from '@steeze-ui/svelte-icon';
	// @ts-ignore
	import { Pencil } from '@steeze-ui/heroicons';

	import { playPlaylist } from '../../stores/playlist.store';

	export let playlist;

	const play = () => {
		playPlaylist(playlist);
	};
</script>

<div class="flex justify-between py-2 px-1 border-b border-b-zinc-600 text-sm hover:bg-zinc-900">
	<a href="/" on:click|preventDefault={play} class="w-full">
		{playlist.name}
	</a>
	<a href={`/playlist/${playlist.id}`} class="flex min-w-fit">
		<div class="w-full my-auto align-middle cursor-pointer">
			<Icon src={Pencil} theme="solid" class="color-gray-900 w-5 h-5" />
		</div>
	</a>
</div>
