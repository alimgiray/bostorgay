<script>
	import '../app.css';
	import Header from '../components/header.svelte';
	import Player from '../components/player.svelte';
	import Notifications from '../components/notification/notifications.svelte';

	import { onMount } from 'svelte';
	let mounted = false;
	onMount(async () => {
		mounted = true;
	});
</script>

{#if mounted}
	<div class="absolute left-0 right-0 mx-auto z-50">
		<Notifications />
	</div>
	<div class="flex flex-col justify-between h-screen">
		<div>
			<Header />
		</div>
		<div class="h-full">
			<slot />
		</div>
		<div class="h-20 border-t">
			<Player />
		</div>
	</div>
{/if}
