<script>
	import { isLoggedIn, logout } from '../stores/user.store';

	const handleLogout = () => {
		logout();
	};
</script>

<div class="flex justify-between p-4 border-b border-slate-400">
	<div>
		<span><a href="/" class="text-orange-500 text-xl font-bold">Bostorgay</a></span>
	</div>
	<div class="text-sm mt-1.5">
		{#if $isLoggedIn}
			<span><a href="/profile">Profile</a></span>
			<span><a href="/" on:click={handleLogout} class="ml-2">Logout</a></span>
		{:else}
			<span class="mx-4"><a href="/login">Login</a></span>
			<span><a href="/register">Register</a></span>
		{/if}
	</div>
</div>
