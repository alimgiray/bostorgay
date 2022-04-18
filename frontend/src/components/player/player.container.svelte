<script>
	import Player from './player.svelte';
	import Controls from './controls.svelte';
	import QueueControl from './queue.control.svelte';
</script>

<div class="flex py-1 px-2 z-10 bg-zinc-800">
	<div class="flex w-full justify-between">
		<Controls />
		<Player />
		<div class="flex">
			<QueueControl />
		</div>
	</div>
</div>
