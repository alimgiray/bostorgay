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
		<a
			href="/playlist/new"
			class="text-slate-200 border border-orange-500 w-full py-2 text-center hover:bg-orange-500 hover:text-slate-800 hover:font-bold"
			>Create New Playlist</a
		>
	</div>
</div>
