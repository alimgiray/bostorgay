<script>
	import SongListItem from './song.list.item.svelte';
	export let songs = [];
</script>

<div class="py-4">
	{#if songs.length > 0}
		{#each songs as song}
			<SongListItem {song} />
		{/each}
	{:else}
		<div class="py-2 text-sm">No songs found</div>
	{/if}
</div>
