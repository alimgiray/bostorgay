<script context="module">
	import { getSongs } from '../stores/song.store';
	import { getArtists } from '../stores/artist.store';

	export async function load({ params, fetch, session, stuff }) {
		await getSongs();
		await getArtists();

		return { status: 200 };
	}
</script>

<script>
	import Search from '../components/search.svelte';
	import SongList from '../components/list/song.list.svelte';
	import ArtistList from '../components/list/artist.list.svelte';

	import { getPlaylists } from '../stores/playlist.store';
	import { isLoggedIn } from '../stores/user.store';
	import { showMoreSongsButton } from '../stores/song.store';
	import { showMoreArtistsButton } from '../stores/artist.store';

	if ($isLoggedIn) {
		getPlaylists();
	}

	showMoreSongsButton.set(true);
	showMoreArtistsButton.set(true);
</script>

<svelte:head>
	<title>Bostorgay</title>
</svelte:head>

<div class="p-4 pb-24 w-full md:w-1/3 mx-auto">
	<Search />
	<div>
		<SongList />
		<h1 class="text-lg font-bold text-orange-500">Artists</h1>
		<ArtistList />
	</div>
</div>
