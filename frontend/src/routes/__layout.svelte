<script>
	import '../app.css';
	import Header from '../components/header.svelte';
	import Player from '../components/player.svelte';

	import { onMount } from 'svelte';
	let mounted = false;
	onMount(async () => {
		mounted = true;
	});
</script>

{#if mounted}
	<div class="flex flex-col justify-between h-screen">
		<div class="h-20">
			<Header />
		</div>
		<div class="h-full">
			<slot />
		</div>
		<div class="h-20">
			<Player />
		</div>
	</div>
{/if}
