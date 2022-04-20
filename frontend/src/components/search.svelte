<script>
	import { custom_event } from 'svelte/internal';
	import { get } from '../lib/api';

	import { Icon } from '@steeze-ui/svelte-icon';
	import { XCircle } from '@steeze-ui/heroicons';

	let ref;
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
		if (searchTerm) {
			get(fetch, `/api/songs/search?q=${searchTerm}`).then((result) => {
				const { response, error } = result;
				if (!error) {
					const event = custom_event(
						'update-songs',
						{
							songs: response
						},
						true
					);
					ref.dispatchEvent(event);
				}
			});
			get(fetch, `/api/artists/search?q=${searchTerm}`).then((result) => {
				const { response, error } = result;
				if (!error) {
					const event = custom_event(
						'update-artists',
						{
							artists: response
						},
						true
					);
					ref.dispatchEvent(event);
				}
			});
		} else {
			get(fetch, '/api/songs/latest').then((result) => {
				const { response, error } = result;
				if (!error) {
					const event = custom_event(
						'update-songs',
						{
							songs: response
						},
						true
					);
					ref.dispatchEvent(event);
				}
			});
			get(fetch, '/api/artists/latest').then((result) => {
				const { response, error } = result;
				if (!error) {
					const event = custom_event(
						'update-artists',
						{
							artists: response
						},
						true
					);
					ref.dispatchEvent(event);
				}
			});
		}
	}
</script>

<div class="flex">
	<input
		id="search"
		type="text"
		bind:this={ref}
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
