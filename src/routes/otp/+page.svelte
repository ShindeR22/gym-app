<script lang="ts">
	import OTPAuth from '$lib/OTPAuth.svelte';
	import { goto } from '$app/navigation';

	// Optionally, define a callback to run after successful OTP sign-in.
	function handleOTPSuccess(user: any) {
		console.log('OTP user signed in:', user);
		// For example, navigate to the protected homepage or update a user store:
		goto('/dashboard');
	}
</script>

<h1>Sign In via OTP</h1>
<OTPAuth onSuccess={handleOTPSuccess} />
