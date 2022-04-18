<script>
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Play, Pause } from '@steeze-ui/heroicons';

	import { isPlaying, currentSong } from '../../stores/player.store';

	const pauseSong = () => {
		if ($currentSong) {
			isPlaying.set(false);
		}
	};

	const resumeSong = () => {
		if ($currentSong) {
			isPlaying.set(true);
		}
	};
</script>

<div class="flex flex-col justify-center">
	{#if $isPlaying}
		<a href="/" on:click|preventDefault={pauseSong}>
			<div class="cursor-pointer">
				<Icon src={Pause} theme="solid" class="color-gray-900 w-8 h-8" />
			</div>
		</a>
	{:else}
		<a href="/" on:click|preventDefault={resumeSong}>
			<div class="cursor-pointer">
				<Icon src={Play} theme="solid" class="color-gray-900 w-8 h-8" />
			</div>
		</a>
	{/if}
</div>
