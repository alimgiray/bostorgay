<script>
	import { queue, visible } from '../../stores/queue.store';
	import SongListItem from '../list/song.list.item.svelte';
</script>

{#if $visible}
	<div class="border-t max-h-96 bg-zinc-800">
		<div class="border-b flex justify-between bg-zinc-900">
			<div class="pl-1">Queue</div>
			<div class="pr-1 text-sm flex flex-col justify-center">
				{$queue.length} song{$queue.length > 1 ? '(s)' : ''}
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
