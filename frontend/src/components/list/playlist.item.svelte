<script>
	import { Icon } from '@steeze-ui/svelte-icon';
	// @ts-ignore
	import { Play } from '@steeze-ui/heroicons';

	import { playPlaylist } from '../../stores/playlist.store';

	export let playlist;

	const play = () => {
		playPlaylist(playlist);
	};
</script>

<div class="flex justify-between py-2 px-1 border-b border-b-slate-600 text-sm hover:bg-slate-900">
	<a href={`/playlist/${playlist.id}`} class="w-full">
		<div class="flex flex-col justify-center h-full">
			{playlist.name}
		</div>
	</a>
	<a href="/" on:click|preventDefault={play} class="flex min-w-fit">
		<div class="w-full my-auto align-middle cursor-pointer">
			<Icon src={Play} theme="solid" class="w-6 h-6" />
		</div>
	</a>
</div>
