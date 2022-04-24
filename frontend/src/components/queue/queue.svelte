<script>
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ChevronDown, X } from '@steeze-ui/heroicons';

	import { queue, visible, clear } from '../../stores/queue.store';
	import { currentPlaylist } from '../../stores/playlist.store';

	import SongListItem from '../list/song.list.item.svelte';

	const toggleQueue = () => {
		visible.update((v) => !v);
	};

	const clearQueue = () => {
		currentPlaylist.set(null);
		clear();
		toggleQueue();
	};
</script>

<div
	class={`border-t border-slate-500 max-h-96 bg-slate-800 z-10 ${
		$visible ? 'visibility: visible' : 'visibility: hidden'
	}`}
>
	<div class="border-b border-slate-500 flex justify-between bg-slate-700">
		<div class="flex ml-1 py-1">
			{#if $queue.length > 0 || $currentPlaylist}
				<a href="/" on:click|preventDefault={clearQueue}>
					<div class="cursor-pointer">
						<Icon src={X} theme="solid" class="cursor-pointer text-orange-500 w-5 h-5 mt-0.5" />
					</div>
				</a>
			{/if}
			<div class="text-slate-100 ml-2">
				{#if $currentPlaylist}
					{$currentPlaylist.name}
				{:else}
					Queue
				{/if}
			</div>
		</div>
		<div class="flex mr-2">
			<div class="flex flex-col justify-center">
				<a href="/" on:click|preventDefault={toggleQueue}>
					<div class="cursor-pointer">
						<Icon src={ChevronDown} theme="solid" class="text-orange-500 w-6 h-6" />
					</div>
				</a>
			</div>
		</div>
	</div>
	<div class="overflow-y-auto max-h-96">
		{#if $queue.length > 0}
			{#each $queue as song}
				<SongListItem {song} />
			{/each}
		{/if}
	</div>
</div>
