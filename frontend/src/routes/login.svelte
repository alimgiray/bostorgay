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
	import Footer from '../components/footer.svelte';
	import { login } from '../stores/user.store';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';

	const handleLogin = async () => {
		const success = await login(email, password);
		if (success) {
			goto('/');
		}
	};
</script>

<div class="px-4 w-full md:w-1/3 mx-auto">
	<form on:submit|preventDefault={handleLogin}>
		<div class="mt-4">
			<input type="email" bind:value={email} placeholder="email" />
		</div>
		<div class="mt-3">
			<input type="password" bind:value={password} placeholder="password" />
		</div>
		<div class="mt-3 flex justify-end">
			<button class="full-button">Login</button>
		</div>
	</form>
</div>
<div class="mt-4">
	<Footer />
</div>
