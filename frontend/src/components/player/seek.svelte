<script>
	import { currentSong, totalTime, currentTime } from '../../stores/player.store';

	$: elapsed = Math.round(($currentTime / $totalTime) * 100);
</script>

{#if currentSong}
	<div class={`h-px z-20 border-t border-red-800 w-[${elapsed}%]`} />
{/if}
