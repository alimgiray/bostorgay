<script>
	import { isLoggedIn, logout } from '../stores/user.store';

	const handleLogout = () => {
		logout();
	};
</script>

<div class="flex justify-between p-4 border-b">
	<div><span><a href="/">Bostorgay</a></span></div>
	<div>
		{#if $isLoggedIn}
			<span><a href="/playlist">Playlists</a></span>
			<span><a href="/" on:click={handleLogout} class="ml-2">Logout</a></span>
		{:else}
			<span class="mx-4"><a href="/login">Login</a></span>
			<span><a href="/register">Register</a></span>
		{/if}
	</div>
</div>
