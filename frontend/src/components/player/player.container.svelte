<script>
	// @ts-nocheck
	import Player from './player.svelte';
	import Controls from './controls.svelte';
	import Time from './time.svelte';
	import QueueControl from './queue.control.svelte';
</script>

<div class="flex py-2 px-4 z-10 bg-zinc-800">
	<div class="flex w-full justify-between">
		<Controls />
		<Player />
		<div class="flex">
			<QueueControl />
		</div>
	</div>
</div>
