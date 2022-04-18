<script>
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Play, Pause, ChevronDoubleRight, ChevronDoubleLeft } from '@steeze-ui/heroicons';

	import { isPlaying, currentSong } from '../../stores/player.store';
	import { playPreviousSong, playNextSong } from '../../stores/queue.store';

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

	const previousSong = () => {
		playPreviousSong($currentSong);
	};

	const nextSong = () => {
		playNextSong($currentSong);
	};
</script>

<div class="flex flex-col justify-center">
	<div class="flex">
		<a href="/" on:click|preventDefault={previousSong}>
			<div class="cursor-pointer">
				<Icon src={ChevronDoubleLeft} theme="solid" class="color-gray-900 w-8 h-8 mr-2" />
			</div>
		</a>
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
		<a href="/" on:click|preventDefault={nextSong}>
			<div class="cursor-pointer">
				<Icon src={ChevronDoubleRight} theme="solid" class="color-gray-900 w-8 h-8 ml-2" />
			</div>
		</a>
	</div>
</div>
