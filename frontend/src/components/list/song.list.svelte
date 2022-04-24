<script>
	import SongListItem from './song.list.item.svelte';
	import {
		songs,
		isSearchResults,
		loadMoreSongs,
		showMoreSongsButton
	} from '../../stores/song.store';
</script>

<div class="py-4">
	{#if $songs.length > 0}
		{#each $songs as song}
			<SongListItem {song} />
		{/each}
		{#if !$isSearchResults && $showMoreSongsButton}
			<button class="mt-2 full-button" on:click={loadMoreSongs}>Load More</button>
		{/if}
	{:else}
		<div class="py-2 text-sm">No songs found</div>
	{/if}
</div>
