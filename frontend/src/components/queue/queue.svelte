<script>
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ChevronDown } from '@steeze-ui/heroicons';

	import { queue, visible } from '../../stores/queue.store';

	import SongListItem from '../list/song.list.item.svelte';

	const toggleQueue = () => {
		visible.update((v) => !v);
	};
</script>

<div
	class={`border-t border-slate-500 max-h-96 bg-slate-800 ${
		$visible ? 'visibility: hidden' : 'visibility: visible'
	}`}
>
	<div class="border-b border-slate-500 flex justify-between bg-slate-700">
		<div class="flex ml-2 py-1">
			<div class="text-slate-100">Queue</div>
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
