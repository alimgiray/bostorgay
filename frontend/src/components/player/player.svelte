<script>
	// @ts-nocheck
	import { currentSong, src, isPlaying, totalTime, currentTime } from '../../stores/player.store';
	import { playNextSong } from '../../stores/queue.store';
	import Time from './time.svelte';

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

	document.addEventListener('update-time', (e) => {
		const audioElement = document.getElementById('audio');
		if (audioElement) {
			// @ts-ignore
			audioElement.currentTime = e.detail?.time;
			currentTime.set(Math.trunc(audioElement.currentTime));
		}
	});

	currentSong.subscribe((song) => {
		const audioElement = document.getElementById('audio');
		if (audioElement) {
			if (!song) {
				audioElement.pause();
				audioElement.currentTime = 0;
			}
			audioElement.load();
			audioElement.addEventListener('canplay', () => {
				audioElement.play();
				totalTime.set(Math.trunc(audioElement.duration));
			});
			audioElement.addEventListener('ended', () => {
				playNextSong(song);
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

<div class="flex truncate">
	<div class="truncate">
		{#if $currentSong}
			<span
				><div class="text-center truncate">
					{$currentSong.name}
				</div>
				<div class="text-center text-sm text-gray-400">
					{$currentSong.artists.map((artist) => artist.name).join(' ')}
				</div>
				<div class="mt-0 mb-1"><Time /></div>
			</span>
		{:else}
			<span>-</span>
		{/if}
		<audio id="audio">
			<source id="audioSource" src={$src} />
			Your browser does not support the audio format.
		</audio>
	</div>
</div>
