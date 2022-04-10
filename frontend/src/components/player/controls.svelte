<script>
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Play, Pause } from '@steeze-ui/heroicons';

	import { isPlaying } from '../../stores/player.store';

	const pauseSong = () => {
		isPlaying.set(false);
	};

	const resumeSong = () => {
		isPlaying.set(true);
	};
</script>

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
