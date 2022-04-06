<script>
	import { Icon } from '@steeze-ui/svelte-icon';
	// @ts-ignore
	import { Play, Pause } from '@steeze-ui/heroicons';
	import { currentSong, isPlaying } from '../stores/player.store';

	const pauseSong = () => {
		console.log('pause');
		isPlaying.set(false);
	};

	const resumeSong = () => {
		console.log('resume');
		isPlaying.set(true);
	};
</script>

{#if $currentSong}
	<div class="py-2 px-4">
		<div class="flex">
			<div>
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
			<div class="flex flex-col justify-center ml-4">
				Playing {$currentSong.name}
			</div>
		</div>
	</div>
{/if}
