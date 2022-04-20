<script context="module">
	import { get } from '../lib/api';

	export const load = async ({ params, fetch, session, stuff }) => {
		const { response: songResponse, error: songError } = await get(fetch, `/api/songs/count`);
		const { response: artistResponse, error: artistsError } = await get(
			fetch,
			`/api/artists/count`
		);

		if (songError || artistsError) {
			return { status: 200, props: { artistCount: 0, songCount: 0 } };
		}
		return {
			status: 200,
			props: { artistCount: artistResponse.count, songCount: songResponse.count }
		};
	};
</script>

<script>
	export let artistCount;
	export let songCount;
</script>

<svelte:head>
	<title>About Bostorgay</title>
</svelte:head>

<div class="p-4 w-full md:w-1/3 mx-auto text-sm text-justify">
	<p class="my-2">
		<span class="text-orange-500">Bostorgay </span>
		<span
			>is a place where you can find and listen (hopefully) all the Crimean Tatar folk music online.
			Aim of the project is to help preserve Crimean Tatar culture & music by creating a complete
			and searchable collection of it. I'm simply searching the web and put the music I found online
			here.</span
		>
	</p>

	<p class="my-2">
		<span class="text-orange-500">Copyright </span>
		<span
			>is an important subject for musicians and I'm aware of it. I don't make any money from this
			website, there are no ads and there never will be. However, if you don't want your music to be
			on this platform, <a href="mailto:alimgiray@gmail.com" class="text-orange-500 underline"
				>contact me</a
			> and I'll remove it.</span
		>
	</p>

	<p class="my-2">
		<span class="text-orange-500">In total </span>
		<span
			>there are <a href="/" class="text-orange-500 underline">{songCount} songs</a> from
			<a href="/" class="text-orange-500 underline">{artistCount} artists</a> available on this platform
			currently.</span
		>
	</p>

	<p class="my-2">
		<span class="text-orange-500">Design </span>
		<span
			>of the website done by <a href="mailto:nurbike0@gmail.com" class="text-orange-500 underline"
				>Nurbike</a
			>.</span
		>
	</p>
</div>
