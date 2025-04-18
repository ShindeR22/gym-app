<!-- src/lib/OTPAuth.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { auth } from '$lib/firebase/firebase';
	import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
	import { goto } from '$app/navigation'; // Import goto for navigation

	export let onSuccess: (user: any) => void; // Optional: callback if sign in succeeds.
	let firstName: string = '';
	let lastName: string = '';
	let address: string = '';
	let phone: string = '+91 ';
	let otp: string = '';
	let confirmationResult: any = null;
	let recaptchaVerifier: RecaptchaVerifier;
	let isSendingOtp = false;
	let isVerifyingOtp = false;
	let phoneError = '';
	let otpError = '';

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
		isSendingOtp = true;
		phoneError = '';
		try {
			confirmationResult = await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
			console.log('OTP has been sent to your phone.');
		} catch (error) {
			console.error('Error during sending OTP:', error);
			phoneError = 'Failed to send OTP. Please check your phone number.';
			if (recaptchaVerifier) {
				recaptchaVerifier.clear();
				recaptchaVerifier.render().then((widgetId) => {
					console.log('reCAPTCHA re-rendered with widget ID:', widgetId);
				});
			}
		} finally {
			isSendingOtp = false;
		}
	}

	async function verifyOtp(e: Event) {
		e.preventDefault();
		isVerifyingOtp = true;
		otpError = '';
		try {
			const result = await confirmationResult.confirm(otp);
			console.log('OTP verified and user is signed in.');
			console.log('User:', result.user);
			if (onSuccess) {
				onSuccess(result.user); // Call the onSuccess callback if provided
			}
			goto('/dashboard'); // Navigate to the dashboard page
		} catch (error) {
			console.error('OTP verification failed:', error);
			otpError = 'Invalid OTP. Please try again.';
		} finally {
			isVerifyingOtp = false;
		}
	}
</script>

<section class="flex min-h-screen items-center justify-center bg-gray-100">
	<div class="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
		<div class="mb-8 text-center">
			<h1 class="text-4xl font-bold text-blue-600">MyApp</h1>
			<p class="text-gray-600">Login to your account</p>
		</div>
		<div id="recaptcha-container"></div>
		<form on:submit={sendOtp} class="space-y-4">
			<h2 class="text-center text-2xl font-bold">Login with Phone</h2>
			<div>
				<label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
				<input
					id="firstName"
					type="text"
					bind:value={firstName}
					required
					disabled={!!confirmationResult}
					class="mt-1 w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
			</div>
			<div>
				<label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
				<input
					id="lastName"
					type="text"
					bind:value={lastName}
					required
					disabled={!!confirmationResult}
					class="mt-1 w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
			</div>
			<div>
				<label for="address" class="block text-sm font-medium text-gray-700"
					>Address (optional)</label
				>
				<input
					id="address"
					type="text"
					bind:value={address}
					disabled={!!confirmationResult}
					class="mt-1 w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
			</div>
			<div>
				<label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
				<input
					id="phone"
					type="tel"
					bind:value={phone}
					placeholder="+1234567890"
					required
					class="mt-1 w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
				{#if phoneError}
					<p class="mt-1 text-sm text-red-500">{phoneError}</p>
				{/if}
			</div>
			<button
				id="sign-in-button"
				type="submit"
				disabled={isSendingOtp}
				class="w-full rounded-md bg-blue-500 py-2 text-white transition duration-300 hover:bg-blue-600 {isSendingOtp
					? 'cursor-not-allowed opacity-50'
					: ''}"
			>
				{isSendingOtp ? 'Sending...' : 'Send OTP'}
			</button>
		</form>
		{#if confirmationResult}
			<p class="mb-4 text-center text-green-500">OTP sent successfully. Please check your phone.</p>
			<form on:submit={verifyOtp} class="space-y-4">
				<h2 class="text-center text-2xl font-bold">Verify OTP</h2>
				<div>
					<label for="otp" class="block text-sm font-medium text-gray-700">OTP Code</label>
					<input
						id="otp"
						type="text"
						bind:value={otp}
						placeholder="Enter OTP"
						required
						class="mt-1 w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					/>
					{#if otpError}
						<p class="mt-1 text-sm text-red-500">{otpError}</p>
					{/if}
				</div>
				<button
					type="submit"
					disabled={isVerifyingOtp}
					class="w-full rounded-md bg-green-500 py-2 text-white transition duration-300 hover:bg-green-600 {isVerifyingOtp
						? 'cursor-not-allowed opacity-50'
						: ''}"
				>
					{isVerifyingOtp ? 'Verifying...' : 'Verify OTP'}
				</button>
			</form>
		{/if}
	</div>
</section>
