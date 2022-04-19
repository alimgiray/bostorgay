<script>
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ChevronUp, ChevronDown } from '@steeze-ui/heroicons';

	import { visible } from '../../stores/queue.store';

	const toggleQueue = () => {
		visible.update((v) => !v);
	};
</script>

<div class="flex flex-col justify-center">
	<div class="flex justify-end pr-2">
		{#if $visible}
			<a href="/" on:click|preventDefault={toggleQueue}>
				<div class="cursor-pointer">
					<Icon src={ChevronUp} theme="solid" class="w-8 h-8" />
				</div>
			</a>
		{:else}
			<a href="/" on:click|preventDefault={toggleQueue}>
				<div class="cursor-pointer">
					<Icon src={ChevronDown} theme="solid" class="w-8 h-8" />
				</div>
			</a>
		{/if}
	</div>
</div>
