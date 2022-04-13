<script context="module">
	import { isLoggedIn } from '../../stores/user.store';
	import { get } from 'svelte/store';

	export const load = ({ params, fetch, session, stuff }) => {
		if (!get(isLoggedIn)) {
			return { status: 302, redirect: '/' };
		}
		return {
			status: 200,
			props: {
				id: params.id
			}
		};
	};
</script>

<script>
	export let id;
</script>

<div class="p-4">Playlist {id}</div>
