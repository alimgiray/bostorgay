<script context="module">
	import { isLoggedIn } from '../stores/user.store';
	import { get } from 'svelte/store';

	export const load = () => {
		if (get(isLoggedIn)) {
			return { status: 302, redirect: '/' };
		}
		return {
			status: 200
		};
	};
</script>

<script>
	import { login } from '../stores/user.store';

	let email = '';
	let password = '';

	const handleLogin = async () => {
		const success = await login(email, password);
		if (success) {
		}
	};
</script>

<div class="p-4 w-full md:w-1/3 mx-auto">
	<form on:submit|preventDefault={handleLogin}>
		<div class="mt-2">
			<input type="email" bind:value={email} placeholder="email" />
		</div>
		<div class="mt-2">
			<input type="password" bind:value={password} placeholder="password" />
		</div>
		<div class="mt-2 flex justify-end">
			<button class="border px-4 py-1">Login</button>
		</div>
	</form>
</div>
