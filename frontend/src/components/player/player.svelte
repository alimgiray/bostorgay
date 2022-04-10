<script>
	// @ts-nocheck
	import { currentSong, src, isPlaying, totalTime, currentTime } from '../../stores/player.store';

	isPlaying.subscribe((playing) => {
		const audioElement = document.getElementById('audio');
		if (audioElement) {
			if (playing) {
				if (audioElement.readyState) {
					audioElement.play();
				}
			} else {
				audioElement.pause();
			}
		}
	});

	currentSong.subscribe((newSong) => {
		const audioElement = document.getElementById('audio');
		if (audioElement) {
			audioElement.load();
			audioElement.addEventListener('canplay', () => {
				audioElement.play();
				totalTime.set(Math.trunc(audioElement.duration));
			});
			audioElement.addEventListener('ended', () => {
				// TODO after implementing queue, play next song
				console.log('ended');
			});
			audioElement.addEventListener('timeupdate', () => {
				currentTime.set(Math.trunc(audioElement.currentTime));
			});
		}
	});

	const handleKeydown = (e) => {
		// If space pressed
		if (e.keyCode === 32) {
			isPlaying.set(!$isPlaying);
		}
	};
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="flex">
	<div class="flex flex-col justify-center ml-3">
		<span class="ml-1">{$currentSong?.name}</span>
		<audio id="audio">
			<source id="audioSource" src={$src} />
			Your browser does not support the audio format.
		</audio>
	</div>
</div>
