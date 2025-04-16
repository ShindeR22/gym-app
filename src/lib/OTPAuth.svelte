<!-- src/lib/OTPAuth.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { auth } from '$lib/firebase/firebase';
	import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

	export let onSuccess: (user: any) => void; // Optional: callback if sign in succeeds.

	let phone: string = '';
	let otp: string = '';
	let confirmationResult: any = null;
	let recaptchaVerifier: RecaptchaVerifier;
	onMount(() => {
		if (typeof window !== 'undefined' && !recaptchaVerifier) {
			recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
				size: 'invisible',
				callback: (response: string) => {
					console.log('reCAPTCHA solved with response:', response);
				},
				'expired-callback': () => {
					console.log('reCAPTCHA expired; please solve again');
				}
			});
			recaptchaVerifier.render().then((widgetId) => {
				console.log('reCAPTCHA rendered with widget ID:', widgetId);
			});
		}
	});

	async function sendOtp(e: Event) {
		e.preventDefault();
		try {
			confirmationResult = await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
			alert('OTP has been sent to your phone.');
		} catch (error) {
			console.error('Error during sending OTP:', error);
			alert('Failed to send OTP. Please try again.');
			// Reset reCAPTCHA
			if (recaptchaVerifier) {
				recaptchaVerifier.clear();
				recaptchaVerifier.render().then((widgetId) => {
					console.log('reCAPTCHA re-rendered with widget ID:', widgetId);
				});
			}
		}
	}

	async function verifyOtp(e: Event) {
		e.preventDefault();
		try {
			const result = await confirmationResult.confirm(otp);
			// User is signed in; call the onSuccess callback if provided
			alert('OTP verified and user is signed in.');
			console.log('User:', result.user);
			if (onSuccess) {
				onSuccess(result.user);
			}
		} catch (error) {
			console.error('OTP verification failed:', error);
			alert('Invalid OTP. Please try again.');
		}
	}
</script>

<!-- OTP UI markup -->
<section>
	<div id="recaptcha-container"></div>
	<form on:submit={sendOtp}>
		<h2>Enter your phone number</h2>
		<input type="text" bind:value={phone} placeholder="+1234567890" required />
		<button id="sign-in-button" type="submit">Send OTP</button>
	</form>

	{#if confirmationResult}
		<form on:submit={verifyOtp}>
			<h2>Enter the OTP</h2>
			<input type="text" bind:value={otp} placeholder="Enter OTP" required />
			<button type="submit">Verify OTP</button>
		</form>
	{/if}
</section>
