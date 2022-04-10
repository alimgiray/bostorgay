<script>
	import { Icon } from '@steeze-ui/svelte-icon';
	// @ts-ignore
	import { Play } from '@steeze-ui/heroicons';

	import { play, currentSong } from '../../stores/player.store';

	export let song = {};
	const playSong = () => {
		play(song);
	};

	$: isCurrentSong = $currentSong?.id === song.id;
</script>

<div>
	<div
		class={`flex justify-between py-2 px-1 border-b border-b-zinc-600 text-sm hover:bg-zinc-900 ${
			isCurrentSong ? 'bg-gray-500' : ''
		}`}
	>
		<a href="/" on:click|preventDefault={playSong} class="flex min-w-fit pr-4">
			<div class="cursor-pointer mx-auto my-auto align-middle">
				<Icon src={Play} theme="solid" class="color-gray-900 w-5 h-5" />
			</div>
			<div class="w-full ml-2 my-auto align-middle cursor-pointer">
				{song.name}
			</div>
		</a>
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
