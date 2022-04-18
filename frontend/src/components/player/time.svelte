<script>
	// @ts-nocheck
	import { totalTime, currentTime } from '../../stores/player.store';
	import { custom_event } from 'svelte/internal';

	let ref;

	$: displayTotalTime = () => {
		return formatTime($totalTime);
	};
	$: displayElapsedTime = () => {
		return formatTime($currentTime);
	};

	const seek = (e) => {
		ref.dispatchEvent(
			custom_event(
				'update-time',
				{
					time: e.target.value
				},
				true
			)
		);
	};

	const formatTime = (totalSeconds) => {
		const minutes = Math.trunc(totalSeconds / 60);
		let seconds = Math.trunc(totalSeconds % 60);
		if (seconds < 10) {
			seconds = '0' + seconds;
		}
		return `${minutes}:${seconds}`;
	};
</script>

<div class="text-center text-xs">
	<div class="flex gap-2 font-light">
		<div>{displayElapsedTime()}</div>
		<div>
			<input
				class="
					appearance-none
					w-full
					bg-zinc-600
					h-1
					p-0
					focus:outline-none focus:ring-0 focus:shadow-none"
				type="range"
				min="1"
				step="1"
				max={$totalTime}
				value={$currentTime}
				on:input={seek}
				bind:this={ref}
			/>
		</div>
		<div>{displayTotalTime()}</div>
	</div>
</div>
