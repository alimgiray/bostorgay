<script>
	export let artist = {};
</script>

<div>
	<a
		href={`/artist/${artist.name
			.replace(/[^a-z0-9_]+/gi, '-')
			.replace(/^-|-$/g, '')
			.toLowerCase()}---${artist.id}`}
	>
		<div
			class="flex justify-between py-2 border-b border-b-zinc-600 text-sm hover:bg-zinc-900 cursor-pointer"
		>
			<div class="w-full my-auto align-middle">
				{artist.name}
			</div>
		</div>
	</a>
</div>
