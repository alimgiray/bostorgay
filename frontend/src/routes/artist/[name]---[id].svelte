<script context="module">
	import { get } from '../../lib/api';
	export async function load({ params, fetch, session, stuff }) {
		const { response: artistResponse, error: artistError } = await get(
			fetch,
			`/api/artists/${params.id}`
		);
		const { response: songsResponse, error: songsError } = await get(
			fetch,
			`/api/artists/${params.id}/songs`
		);

		if (artistError || songsError) {
			return {
				status: 200,
				props: {
					id: 0,
					name: '',
					songs: []
				}
			};
		} else {
			return {
				status: 200,
				props: {
					id: artistResponse.id,
					name: artistResponse.name,
					songs: songsResponse
				}
			};
		}
	}
</script>

<script>
	import { Icon } from '@steeze-ui/svelte-icon';
	// @ts-ignore
	import { Play } from '@steeze-ui/heroicons';

	export let id = '';
	export let name = '';
	export let songs = [];
</script>

<svelte:head>
	<title>{name}</title>
</svelte:head>

<div class="p-4">
	<div class="pb-2 text-center">{name}</div>
	{#each songs as song}
		<div class="flex justify-between py-2 border-b border-b-zinc-600 text-sm hover:bg-zinc-900">
			<div class="cursor-pointer mx-auto my-auto align-middle">
				<Icon src={Play} theme="solid" class="color-gray-900 w-5 h-5" />
			</div>
			<div class="w-full ml-2 my-auto align-middle">
				{song.name}
			</div>
		</div>
	{/each}
</div>
