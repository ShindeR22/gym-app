<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { SignIn, SignOut } from '@auth/sveltekit/components';
	import OTPAuth from '$lib/OTPAuth.svelte'; // Import your OTP authentication component

	let showDropdown = false;
	let showOTP = false; // Toggle for showing OTP sign-in

	const toggleDropdown = () => {
		showDropdown = !showDropdown;
	};

	const closeDropdown = () => {
		showDropdown = false;
	};

	// New toggle for OTP component
	const toggleOTP = () => {
		showOTP = !showOTP;
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (!(event.target as HTMLElement).closest('#profileDropdown')) {
			closeDropdown();
		}
	};

	onMount(() => {
		window.addEventListener('click', handleClickOutside);
		return () => window.removeEventListener('click', handleClickOutside);
	});

	// Derived reactive value for the user's email (if available)
	$: userEmail = $page.data.session?.user?.email;

	// Function to navigate to the profile page.
	const handleProfileClick = () => {
		if (userEmail) {
			// It is recommended to encode the email in case it contains special characters
			goto(`/user-${encodeURIComponent(userEmail)}`);
		}
	};

	// Callback after successful OTP authentication.
	const handleOTPSuccess = (user: any) => {
		// For example, redirect to a protected page (or update your session)
		goto('/dashboard');
	};
</script>

<nav class="relative bg-gray-800 p-4 text-white">
	<div class="container mx-auto flex items-center justify-between">
		<h1 class="text-2xl font-bold">BM Fitness</h1>
		<ul class="flex items-center space-x-6">
			<li><a href="/" class="hover:underline">Home</a></li>
			<li><a href="/about" class="hover:underline">About</a></li>
			<li><a href="/classes" class="hover:underline">Classes</a></li>
			<li><a href="/contact" class="hover:underline">Contact</a></li>
			<!-- New OTP Sign In button -->
			<li>
				<button on:click={toggleOTP} class="text-sm hover:underline"> OTP Sign In </button>
			</li>

			<!-- Profile Dropdown -->
			<li class="relative" id="profileDropdown">
				<button
					class="ml-4 focus:outline-none"
					on:click={toggleDropdown}
					aria-label="User menu"
					title="User Menu"
				>
					<!-- Icon (or user image if logged in) -->
					{#if $page.data.session?.user?.image}
						<img
							src={$page.data.session.user.image}
							alt="User Profile"
							class="h-8 w-8 rounded-full object-cover"
						/>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M5.121 17.804A7 7 0 0112 15a7 7 0 016.879 2.804M15 11a3 3 0 10-6 0 3 3 0 006 0z"
							/>
						</svg>
					{/if}
				</button>

				<!-- Dropdown Content -->
				{#if showDropdown}
					<div
						class="ring-opacity-5 absolute right-0 z-10 mt-2 w-64 origin-top-right transform rounded-lg bg-white p-6 text-black shadow-xl ring-1 ring-black transition"
					>
						{#if $page.data.session}
							<div class="flex flex-col items-center">
								{#if $page.data.session.user?.image}
									<img
										src={$page.data.session.user.image}
										alt="User Profile"
										class="mb-3 h-16 w-16 rounded-full border border-gray-200 object-cover"
									/>
								{/if}
								<p class="text-center text-lg font-bold text-gray-800">
									{$page.data.session.user?.name ?? 'Anonymous User'}
								</p>
								<p class="mb-4 text-center text-sm text-gray-500">
									{$page.data.session.user?.email}
								</p>
								<!-- New "Profile" button -->
								<button
									on:click={handleProfileClick}
									class="mb-4 w-full cursor-pointer rounded-lg bg-green-500 px-4 py-2 text-center text-sm font-medium text-white shadow transition duration-150 hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:outline-none"
								>
									Profile
								</button>
								<SignOut>
									<div
										slot="submitButton"
										role="button"
										tabindex="0"
										class="w-full cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-center text-sm font-medium text-white shadow transition duration-150 hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:outline-none"
									>
										Sign Out
									</div>
								</SignOut>
							</div>
						{:else}
							<div class="flex flex-col items-center">
								<p class="mb-4 text-center text-base font-medium text-gray-700">
									You are not signed in
								</p>
								<SignIn>
									<div
										slot="submitButton"
										role="button"
										tabindex="0"
										class="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-base font-semibold text-white shadow transition duration-150 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
									>
										Sign In
									</div>
								</SignIn>
							</div>
						{/if}
					</div>
				{/if}
			</li>
		</ul>
	</div>
</nav>

<!-- Conditionally show the OTP authentication component below the nav -->
{#if showOTP}
	<div class="container mx-auto my-4">
		<OTPAuth onSuccess={handleOTPSuccess} />
		<button
			on:click={() => (showOTP = false)}
			class="mt-2 rounded bg-gray-200 px-3 py-1 text-sm text-gray-800"
		>
			Close OTP Sign In
		</button>
	</div>
{/if}
