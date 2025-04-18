<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { SignIn, SignOut } from '@auth/sveltekit/components';

	let showDropdown = false;

	const toggleDropdown = () => {
		showDropdown = !showDropdown;
	};

	const closeDropdown = () => {
		showDropdown = false;
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

	// Reactive user email
	$: userEmail = $page.data.session?.user?.email;

	const handleProfileClick = () => {
		if (userEmail) {
			goto(`/user-${encodeURIComponent(userEmail)}`);
		}
	};

	// Navigate to /phone for phone sign‑in
	const handlePhoneSignIn = () => {
		goto('/phone');
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

			<!-- Profile Dropdown -->
			<li class="relative" id="profileDropdown">
				<button
					class="ml-4 focus:outline-none"
					on:click={toggleDropdown}
					aria-label="User menu"
					title="User Menu"
				>
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
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M5.121 17.804A7 7 0 0112 15a7 7 0 016.879 2.804M15 11a3 3 0 10-6 0 3 3 0 006 0z"
							/>
						</svg>
					{/if}
				</button>

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
								<button
									on:click={handleProfileClick}
									class="mb-4 w-full rounded-lg bg-green-500 px-4 py-2 text-center text-sm font-medium text-white shadow hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none"
								>
									Profile
								</button>
								<SignOut>
									<div
										slot="submitButton"
										role="button"
										tabindex="0"
										class="w-full rounded-lg bg-red-500 px-4 py-2 text-center text-sm font-medium text-white shadow hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:outline-none"
									>
										Sign Out
									</div>
								</SignOut>
							</div>
						{:else}
							<div class="flex flex-col items-center">
								<button
									on:click={handlePhoneSignIn}
									class="m-2 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-base font-semibold text-white shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
								>
									Sign In with Phone
								</button>
								<SignIn provider="google">
									<div
										slot="submitButton"
										role="button"
										tabindex="0"
										class="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-base font-semibold text-white shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
									>
										Sign In with Google
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
