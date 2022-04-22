<script>
	import PlaylistItem from '../list/playlist.item.svelte';
	export let playlists = [];
</script>

<div class="pb-2 flex justify-center">
	<div class="font-bold text-lg underline">Playlists</div>
</div>
<div class="w-full md:w-1/3 mx-auto">
	{#each playlists as playlist}
		<PlaylistItem {playlist} />
	{/each}
	<div class="flex justify-end mt-4">
		<a href="/playlist/new" class="full-button">Create New Playlist</a>
	</div>
</div>
