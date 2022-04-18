<script>
	import Player from './player.svelte';
	import Controls from './controls.svelte';
	import QueueControl from './queue.control.svelte';
</script>

<div class="flex flex-col bg-zinc-800">
	<div class="flex py-1 px-2 w-full justify-between bg-zinc-800">
		<Controls />
		<Player />
		<div class="flex">
			<QueueControl />
		</div>
	</div>
</div>
