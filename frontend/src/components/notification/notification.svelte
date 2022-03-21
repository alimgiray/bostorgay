<script>
	import { removeNotification } from '../../stores/notification.store';
	import { fade } from 'svelte/transition';

	export let id = 0;
	export let isError = false;
</script>

<article
	class={`p-2 flex justify-between align-middle w-auto mx-auto ${
		isError ? 'bg-rose-900' : 'bg-teal-900'
	}`}
	role="alert"
	transition:fade
>
	<div class="mx-auto my-auto align-middle">
		<slot />
	</div>
	<div class="flex flex-col justify-start mx-2">
		<button class="border py-0.5 px-2" on:click={() => removeNotification(id)}> X </button>
	</div>
</article>
