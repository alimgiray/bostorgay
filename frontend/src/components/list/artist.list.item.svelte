<script>
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArrowNarrowRight } from '@steeze-ui/heroicons';
	export let artist = {};
</script>

<div>
	<a
		href={`/artist/${artist.name
			.replace(/[^a-z0-9_]+/gi, '-')
			.replace(/^-|-$/g, '')
			.toLowerCase()}---${artist.id}`}
	>
		<h1
			class="flex justify-between py-2 border-b border-b-slate-700 text-sm hover:bg-slate-900 cursor-pointer"
		>
			<div class="flex w-full my-auto align-middle">
				<Icon src={ArrowNarrowRight} theme="solid" class="text-orange-400 w-4 h-4 ml-2" />
				<span class="ml-2">{artist.name}</span>
			</div>
		</h1>
	</a>
</div>
