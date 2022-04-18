<script>
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ChevronDown } from '@steeze-ui/heroicons';

	import { queue, visible } from '../../stores/queue.store';

	import SongListItem from '../list/song.list.item.svelte';

	const toggleQueue = () => {
		visible.update((v) => !v);
	};
</script>

{#if $visible}
	<div class="border-t max-h-96 bg-zinc-800">
		<div class="border-b flex justify-between bg-zinc-900">
			<div class="flex ml-2 py-1">
				<div>Queue</div>
			</div>
			<div class="flex mr-2">
				<div class="flex flex-col justify-center">
					<a href="/" on:click|preventDefault={toggleQueue}>
						<div class="cursor-pointer">
							<Icon src={ChevronDown} theme="solid" class="color-gray-900 w-6 h-6" />
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
{/if}
