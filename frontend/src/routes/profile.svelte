<script context="module">
	import { isLoggedIn } from '../stores/user.store';
	import { get } from 'svelte/store';
	import { get as getRequest } from '../lib/api';

	export const load = async ({ fetch, session }) => {
		const loggedIn = get(isLoggedIn);
		if (!loggedIn) {
			return { status: 302, redirect: '/' };
		}

		// TODO handle error by sending it to the page and renderin appropriate error message
		const { response, error } = await getRequest(fetch, `/api/playlists`);

		if (error) {
			return { status: 200, props: { playlists: [] } };
		}
		return { status: 200, props: { playlists: response } };
	};
</script>

<script>
	import Account from '../components/profile/account.svelte';
	import Playlists from '../components/playlist/playlists.svelte';
	import Footer from '../components/footer.svelte';

	export let playlists = [];
</script>

<svelte:head>
	<title>Profile</title>
</svelte:head>

<div class="p-4">
	<div class="pb-4">
		<Playlists {playlists} />
	</div>
	<div class="pb-4 mt-4">
		<Account />
	</div>
	<div class="mt-4">
		<Footer />
	</div>
</div>
