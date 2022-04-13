<script context="module">
	import { get as getRequest } from '../../lib/api';

	export const load = async ({ params, fetch, session, stuff }) => {
		// TODO handle error by sending it to the page and renderin appropriate error message
		const { response, error } = await getRequest(fetch, `/api/playlists/${params.id}`);

		if (error) {
			return { status: 200, props: { playlist: {} } };
		}
		return { status: 200, props: { playlist: response } };
	};
</script>

<script>
	export let playlist;
</script>

<div class="p-4">Playlist {playlist.name}</div>
