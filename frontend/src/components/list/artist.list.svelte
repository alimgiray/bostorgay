<script>
	export let artists = [];
</script>

<div class="pt-2 pb-4">
	<div class="">Artists</div>
	{#if artists.length > 0}
		{#each artists as artist}
			<a
				href={`/artist/${artist.name
					.replace(/[^a-z0-9_]+/gi, '-')
					.replace(/^-|-$/g, '')
					.toLowerCase()}---${artist.id}`}
			>
				<div
					class="flex justify-between py-2 border-b border-b-zinc-600 text-sm hover:bg-zinc-900 cursor-pointer"
				>
					<div class="w-full my-auto align-middle">
						{artist.name}
					</div>
				</div>
			</a>
		{/each}
	{:else}
		<div class="py-2 text-sm">No artists found</div>
	{/if}
</div>
