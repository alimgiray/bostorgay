<script>
	import { Icon } from '@steeze-ui/svelte-icon';
	// @ts-ignore
	import { PlusSm, MinusSm } from '@steeze-ui/heroicons';

	import { play, currentSong } from '../../stores/player.store';
	import { append, remove, exists, queue } from '../../stores/queue.store';

	export let song = {};

	const playSong = () => {
		play(song);
	};

	const addToQueue = () => {
		append(song);
	};

	const removeFromQueue = () => {
		remove(song);
	};

	let inQueue = false;

	$: isCurrentSong = $currentSong?.id === song.id;
	$: $queue, (inQueue = exists(song));
</script>

<div>
	<div
		class={`flex justify-between py-2 px-1 border-b border-b-zinc-600 text-sm hover:bg-zinc-900 ${
			isCurrentSong ? 'bg-gray-500' : ''
		}`}
	>
		<div class="flex">
			{#if !inQueue}
				<a href="/" on:click|preventDefault={addToQueue} class="flex min-w-fit pr-2">
					<div class="w-full my-auto align-middle cursor-pointer">
						<Icon src={PlusSm} theme="solid" class="color-gray-900 w-5 h-5" />
					</div>
				</a>
			{:else}
				<a href="/" on:click|preventDefault={removeFromQueue} class="flex min-w-fit pr-2">
					<div class="w-full my-auto align-middle cursor-pointer">
						<Icon src={MinusSm} theme="solid" class="color-gray-900 w-5 h-5" />
					</div>
				</a>
			{/if}
			<a href="/" on:click|preventDefault={playSong} class="flex min-w-fit pr-2">
				<div class="w-full my-auto align-middle cursor-pointer">
					{song.name}
				</div>
			</a>
		</div>
		{#if song.artists && song.artists.length > 0}
			<div class="w-full mr-2 my-auto align-middle text-right">
				{#each song.artists as artist}
					<span class="ml-2">
						<a
							href={`/artist/${artist.name
								.replace(/[^a-z0-9_]+/gi, '-')
								.replace(/^-|-$/g, '')
								.toLowerCase()}---${artist.id}`}
							>{artist.name}
						</a>
					</span>
				{/each}
			</div>
		{/if}
	</div>
</div>
