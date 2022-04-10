<script>
	// @ts-nocheck
	import Player from './player.svelte';
	import Controls from './controls.svelte';
	import Time from './time.svelte';
	import QueueControl from './queue.control.svelte';

	import { currentSong } from '../../stores/player.store';

	$: display = $currentSong == null ? 'none' : 'flex';
</script>

<div class="py-2 px-4" style={`display: ${display}`}>
	<div class="flex w-full justify-between">
		<Controls />
		<Player />
		<div class="flex">
			<Time />
			<QueueControl />
		</div>
	</div>
</div>
