<script>
	import ArtistListItem from './artist.list.item.svelte';
	export let artists = [];
</script>

<div class="pt-2 pb-12">
	{#if artists.length > 0}
		{#each artists as artist}
			<ArtistListItem {artist} />
		{/each}
	{:else}
		<div class="py-2 text-sm">No artists found</div>
	{/if}
</div>
