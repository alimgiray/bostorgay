<script>
	import { updatePassword } from '../../stores/user.store';

	let oldPassword;
	let newPassword;

	const handleUpdatePassword = async () => {
		const success = await updatePassword(oldPassword, newPassword);
		if (success) {
			oldPassword = '';
			newPassword = '';
		}
	};
</script>

<div class="pb-2 flex justify-center">
	<div class="font-bold text-lg underline">Account</div>
</div>
<div class="w-full md:w-1/3 mx-auto">
	<form on:submit|preventDefault={handleUpdatePassword}>
		<div class="mt-4">
			<input type="password" bind:value={oldPassword} placeholder="Current Password" />
		</div>
		<div class="mt-3">
			<input type="password" bind:value={newPassword} placeholder="New Password" />
		</div>
		<div class="mt-3 flex justify-end">
			<button
				class="text-slate-200 border border-orange-500 w-full py-2 text-center hover:bg-orange-500 hover:text-slate-800 hover:font-bold"
				>Update Password</button
			>
		</div>
	</form>
</div>
