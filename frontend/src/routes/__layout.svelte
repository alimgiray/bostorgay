<script>
	import { onMount } from 'svelte';

	import '../app.css';
	import Header from '../components/header.svelte';
	import PlayerContainer from '../components/player/player.container.svelte';
	import Queue from '../components/queue/queue.svelte';
	import Notifications from '../components/notification/notifications.svelte';
	import { preventSleeping } from '../lib/browser';

	let mounted = false;

	onMount(async () => {
		mounted = true;
		preventSleeping();
	});
</script>

{#if mounted}
	<main>
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
			<div class="fixed bottom-0 w-full">
				<Queue />
				<div class="border-t border-slate-500 min-h-max">
					<PlayerContainer />
				</div>
			</div>
		</div>
	</main>
{/if}
