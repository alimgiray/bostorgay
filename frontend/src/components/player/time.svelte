<script>
	// @ts-nocheck
	import { totalTime, currentTime } from '../../stores/player.store';

	$: displayTotalTime = () => {
		return formatTime($totalTime);
	};
	$: displayElapsedTime = () => {
		return formatTime($currentTime);
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

<div class="flex flex-col justify-center">
	<span class="text-sm">{displayElapsedTime()} / {displayTotalTime()}</span>
</div>
