<script>
	// @ts-nocheck
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Play, Pause } from '@steeze-ui/heroicons';
	import { currentSong, currentSource, isPlaying } from '../stores/player.store';

	const pauseSong = () => {
		const audioElement = document.getElementById('audio');
		if (audioElement) {
			audioElement.pause();
			isPlaying.set(false);
		}
	};

	const resumeSong = () => {
		const audioElement = document.getElementById('audio');
		if (audioElement) {
			audioElement.play();
			isPlaying.set(true);
		}
	};

	let totalTime = 0;
	let currentTime = 0;

	$: display = $currentSong == null ? 'none' : 'flex';
	$: displayTotalTime = () => {
		return formatTime(totalTime);
	};
	$: displayElapsedTime = () => {
		return formatTime(currentTime);
	};

	const formatTime = (totalSeconds) => {
		const minutes = Math.trunc(totalSeconds / 60);
		let seconds = Math.trunc(totalSeconds % 60);
		if (seconds < 10) {
			seconds = '0' + seconds;
		}
		return `${minutes}:${seconds}`;
	};

	currentSong.subscribe((newSong) => {
		const audioElement = document.getElementById('audio');
		if (audioElement) {
			audioElement.load();
			audioElement.addEventListener('canplay', () => {
				audioElement.play();
				totalTime = Math.trunc(audioElement.duration);
			});
			audioElement.addEventListener('ended', () => {
				// TODO after implementing queue, play next song
				console.log('ended');
			});
			audioElement.addEventListener('timeupdate', () => {
				currentTime = Math.trunc(audioElement.currentTime);
			});
		}
	});
</script>

<div class="py-2 px-4" style={`display: ${display}`}>
	<div class="flex w-full justify-between">
		<div class="flex">
			<div>
				{#if $isPlaying}
					<a href="/" on:click|preventDefault={pauseSong}>
						<div class="cursor-pointer">
							<Icon src={Pause} theme="solid" class="color-gray-900 w-8 h-8" />
						</div>
					</a>
				{:else}
					<a href="/" on:click|preventDefault={resumeSong}>
						<div class="cursor-pointer">
							<Icon src={Play} theme="solid" class="color-gray-900 w-8 h-8" />
						</div>
					</a>
				{/if}
			</div>
			<div class="flex flex-col justify-center ml-3">
				<span class="ml-1">{$currentSong?.name}</span>
				<audio id="audio">
					<source id="audioSource" src={$currentSource} />
					Your browser does not support the audio format.
				</audio>
			</div>
		</div>

		<div class="flex flex-col justify-center ">
			<span class="text-sm">{displayElapsedTime()} / {displayTotalTime()}</span>
		</div>
	</div>
</div>
