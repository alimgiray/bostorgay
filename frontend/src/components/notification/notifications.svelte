<script>
	import { notifications } from '../../stores/notification.store';
	import Notification from './notification.svelte';
</script>

{#if $notifications}
	<section>
		{#each $notifications as notification (notification.id)}
			<Notification id={notification.id} isError={notification.isError}>
				{notification.text}
			</Notification>
		{/each}
	</section>
{/if}
