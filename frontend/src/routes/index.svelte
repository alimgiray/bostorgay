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
	if ($isLoggedIn) {
		getPlaylists();
	}
</script>

<svelte:head>
	<title>Bostorgay</title>
</svelte:head>

<div class="p-4">
	<Search />
	<div>
		<SongList />
		<h1 class="text-lg font-bold text-orange-500">Artists</h1>
		<ArtistList />
	</div>
</div>
