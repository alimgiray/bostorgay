<script>
	import { Icon } from '@steeze-ui/svelte-icon';
	// @ts-ignore
	import { PlusSm, MinusSm, DotsVertical } from '@steeze-ui/heroicons';

	import { play, currentSong } from '../../stores/player.store';
	import { append, remove, exists, queue } from '../../stores/queue.store';
	import { isLoggedIn } from '../../stores/user.store';
	import {
		playlists,
		addSongToPlaylist,
		removeSongFromPlaylist
	} from '../../stores/playlist.store';

	let modalOpen = false;
	export let song = {};

	const playSong = () => {
		play(song);
	};

	const addToQueue = () => {
		append(song);
	};

	const removeFromQueue = () => {
		remove(song);
	};

	const toggleModal = () => {
		modalOpen = !modalOpen;
	};

	const modifyPlaylist = (playlistID) => {
		if (playlistContainsSong(playlistID)) {
			removeSongFromPlaylist(playlistID, song.id);
		} else {
			addSongToPlaylist(playlistID, song.id);
		}
	};

	const playlistContainsSong = (playlistID) => {
		const playlist = $playlists.find((p) => p.id === playlistID);
		return playlist?.songs?.some((s) => s.id === song.id);
	};

	let inQueue = false;

	$: isCurrentSong = $currentSong?.id === song.id;
	$: $queue, (inQueue = exists(song));
</script>

<div>
	<div
		class={`flex justify-between py-2 px-1 border-b border-b-zinc-600 text-sm hover:bg-zinc-900 ${
			isCurrentSong ? 'bg-gray-500' : ''
		}`}
	>
		<div class="flex">
			{#if !inQueue}
				<a href="/" on:click|preventDefault={addToQueue} class="flex min-w-fit pr-2">
					<div class="w-full my-auto align-middle cursor-pointer">
						<Icon src={PlusSm} theme="solid" class="color-gray-900 w-5 h-5" />
					</div>
				</a>
			{:else}
				<a href="/" on:click|preventDefault={removeFromQueue} class="flex min-w-fit pr-2">
					<div class="w-full my-auto align-middle cursor-pointer">
						<Icon src={MinusSm} theme="solid" class="color-gray-900 w-5 h-5" />
					</div>
				</a>
			{/if}
			<a href="/" on:click|preventDefault={playSong} class="flex min-w-max">
				<div class="w-full my-auto align-middle cursor-pointer">
					{song.name}
				</div>
			</a>
		</div>
		{#if song.artists && song.artists.length > 0}
			<div class="w-full my-auto align-middle text-right truncate">
				{#each song.artists as artist}
					<span class="ml-1">
						<a
							class="text-zinc-400 underline"
							href={`/artist/${artist.name
								.replace(/[^a-z0-9_]+/gi, '-')
								.replace(/^-|-$/g, '')
								.toLowerCase()}---${artist.id}`}
							>{artist.name}
						</a>
					</span>
				{/each}
			</div>
		{/if}
		{#if $isLoggedIn}
			<a href="/" on:click|preventDefault={toggleModal} class="flex min-w-fit ml-2">
				<div class="w-full my-auto align-middle cursor-pointer">
					<Icon src={DotsVertical} theme="solid" class="color-gray-900 w-5 h-5" />
				</div>
			</a>
		{/if}
	</div>
</div>

{#if modalOpen && $isLoggedIn}
	<div class="ml-12 py-1 text-sm">
		{#each $playlists as playlist}
			<a href="/" on:click|preventDefault={() => modifyPlaylist(playlist.id)}>
				<div class="flex border-b py-1">
					<div><input type="checkbox" checked={playlistContainsSong(playlist.id)} /></div>
					<div class="ml-2">{playlist.name}</div>
				</div>
			</a>
		{/each}
		<div class="border-b py-1"><a href="/playlist/new">Create new playlist</a></div>
	</div>
{/if}
