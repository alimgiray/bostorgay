<script>
	// @ts-nocheck
	import { currentSong, src, isPlaying, totalTime, currentTime } from '../../stores/player.store';
	import { playNextSong, playPreviousSong } from '../../stores/queue.store';
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
		const elem = e?.target?.tagName;
		if (elem === 'INPUT') return;

		if (e.keyCode === 32) {
			// Space
			e.preventDefault();
			isPlaying.set(!$isPlaying);
		}
		if (e.keyCode === 39) {
			// Right Arrow
			e.preventDefault();
			playNextSong($currentSong);
		}
		if (e.keyCode === 37) {
			// Left Arrow
			e.preventDefault();
			playPreviousSong($currentSong);
		}
	};
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="flex justify-center truncate bg-slate-800">
	<div class="truncate">
		{#if $currentSong}
			<span
				><div class="text-center truncate">
					{$currentSong.name}
				</div>
				<div class="text-center text-sm text-slate-400">
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
