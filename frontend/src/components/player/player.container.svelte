<script>
	import Player from './player.svelte';
	import Controls from './controls.svelte';
	import QueueControl from './queue.control.svelte';
</script>

<div class="flex flex-col bg-slate-800 z-50">
	<div class="flex py-1 px-2 w-full justify-between bg-slate-800">
		<Controls />
		<Player />
		<QueueControl />
	</div>
</div>
