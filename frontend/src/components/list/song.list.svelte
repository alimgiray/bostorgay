<script>
	import { Icon } from '@steeze-ui/svelte-icon';
	// @ts-ignore
	import { Play } from '@steeze-ui/heroicons';

	export let songs = [];
</script>

<div class="py-4">
	<div>Songs</div>
	{#if songs.length > 0}
		{#each songs as song}
			<div class="flex justify-between py-2 border-b border-b-zinc-600 text-sm hover:bg-zinc-900">
				<div class="cursor-pointer mx-auto my-auto align-middle">
					<Icon src={Play} theme="solid" class="color-gray-900 w-5 h-5" />
				</div>
				<div class="w-full ml-2 my-auto align-middle cursor-pointer">
					{song.name}
				</div>
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
			</div>
		{/each}
	{:else}
		<div class="py-2 text-sm">No songs found</div>
	{/if}
</div>
