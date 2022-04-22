<script>
	import { Icon } from '@steeze-ui/svelte-icon';
	import { XCircle } from '@steeze-ui/heroicons';

	import { searchSongs } from '../stores/song.store';
	import { searchArtists } from '../stores/artist.store';

	let timeout;
	let searchTerm = '';
	$: {
		debounce(searchTerm);
	}

	const resetSearch = () => {
		searchTerm = '';
	};

	const debounce = (searchTerm) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			search(searchTerm);
		}, 500);
	};

	function search(searchTerm) {
		searchSongs(searchTerm);
		searchArtists(searchTerm);
	}
</script>

<div class="flex">
	<input
		id="search"
		type="text"
		bind:value={searchTerm}
		placeholder="search for songs or artists"
		class="text-orange-4000"
	/>
	{#if searchTerm.length > 0}
		<div class="cursor-pointer ml-2 my-auto align-middle ">
			<button class="mt-1" on:click={resetSearch}
				><Icon src={XCircle} theme="solid" class="text-orange-500 w-5 h-5" /></button
			>
		</div>
	{/if}
</div>
