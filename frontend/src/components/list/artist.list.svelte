<script>
	import ArtistListItem from './artist.list.item.svelte';
	import { artists, isSearchResults, loadMoreArtists } from '../../stores/artist.store';
</script>

<div class="pt-2 pb-12">
	{#if $artists.length > 0}
		{#each $artists as artist}
			<ArtistListItem {artist} />
		{/each}
		{#if !$isSearchResults}
			<button class="mt-2 full-button" on:click={loadMoreArtists}>Load More</button>
		{/if}
	{:else}
		<div class="py-2 text-sm">No artists found</div>
	{/if}
</div>
