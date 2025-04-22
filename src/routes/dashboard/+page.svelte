<script lang="ts">
	import { onMount } from 'svelte';
	import { user, gymPlans, showNotifications } from '../../lib/stores';
	import { get } from 'svelte/store';

	// Import components
	import UserProfileCard from './components/UserProfileCard.svelte';
	import MembershipCard from './components/MembershipCard.svelte';
	import DietPaymentCard from './components/DietPaymentCard.svelte';
	import GymPlanCard from './components/GymPlanCard.svelte';
	import WorkoutSchedule from './components/WorkoutSchedule.svelte';
	import FitnessProgressChart from './components/FitnessProgressChart.svelte';
	import NutritionTracker from './components/NutritionTracker.svelte';
	import AchievementBadges from './components/AchievementBadges.svelte';

	let loading = true;

	onMount(async () => {
		document.addEventListener('click', handleClickOutside);

		try {
			const response = await fetch('/api/user', {
				method: 'GET',
				credentials: 'include' // Include cookies for session-based auth
			});
			if (response.ok) {
				const userData = await response.json();
				user.set(userData); // Update the user store with fetched data
			} else {
				console.error('Failed to fetch user data:', response.status);
			}
		} catch (err) {
			console.error('Error fetching user data:', err);
		} finally {
			loading = false; // Hide loading state after fetch attempt
		}

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	function handleClickOutside() {
		// Logic to close notifications can be implemented here
	}

	async function handlePlanSelection(plan) {
		const currentUser = get(user);
		if (!currentUser?._id) {
			console.error('User not loaded. Please log in and try again.');
			return;
		}

		try {
			const response = await fetch('/api/selected-plans', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					userId: currentUser._id,
					plan: plan
				})
			});
			const data = await response.json();
			if (response.ok) {
				console.log('Plan saved successfully:', data);
				user.set(data.user); // Update the user store with the new data
			} else {
				console.error('Failed to save plan:', data.error);
			}
		} catch (err) {
			console.error('Request error:', err);
		}
	}
</script>

{#if loading}
	<div class="flex min-h-screen items-center justify-center bg-gray-900 text-white">
		<div class="loader"></div>
	</div>
{:else}
	<div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 pb-12 text-white">
		<div class="container mx-auto px-4 py-8">
			<!-- Page Header -->
			<div class="mb-8 flex items-center justify-between">
				<h1 class="text-2xl font-bold">My Dashboard</h1>
				<div>
					<span class="rounded-lg bg-purple-600 px-4 py-2 font-medium text-white">
						{$user?.membershipStatus ?? 'No Membership'}
					</span>
				</div>
			</div>

			<!-- Primary Dashboard Grid -->
			<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
				<!-- First Column -->
				<div class="space-y-6">
					{#if $user?.name}
						<UserProfileCard />
					{:else}
						<div class="rounded-lg bg-gray-700 p-4 text-center">Loading profile...</div>
					{/if}

					{#if $user?.workoutSchedule}
						<WorkoutSchedule />
					{:else}
						<div class="rounded-lg bg-gray-700 p-4 text-center">No workout schedule yet.</div>
					{/if}

					<AchievementBadges />
				</div>

				<!-- Second Column -->
				<div class="space-y-6">
					{#if $user?.plan}
						<MembershipCard />
					{:else}
						<div class="rounded-lg bg-gray-700 p-4 text-center">
							No membership details available.
						</div>
					{/if}

					<FitnessProgressChart />
				</div>

				<!-- Third Column -->
				<div class="space-y-6">
					{#if $user?.diet}
						<DietPaymentCard />
					{:else}
						<div class="rounded-lg bg-gray-700 p-4 text-center">No diet payment details.</div>
					{/if}

					<NutritionTracker />
				</div>
			</div>

			<!-- Gym Plans Section -->
			{#if $gymPlans.length > 0}
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each $gymPlans as plan}
						<GymPlanCard {plan} on:planSelected={(e) => handlePlanSelection(e.detail.plan)} />
					{/each}
				</div>
			{:else}
				<p class="rounded-lg bg-gray-700 p-4 text-center text-gray-300">
					No gym plans available right now. Stay tuned!
				</p>
			{/if}

			<!-- Footer -->
			<footer class="mt-16 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
				<div class="mb-4 flex justify-center space-x-6">
					<a href="/" class="hover:text-purple-400">Help Center</a>
					<a href="/" class="hover:text-purple-400">Privacy Policy</a>
					<a href="/" class="hover:text-purple-400">Terms of Service</a>
					<a href="/" class="hover:text-purple-400">Contact Us</a>
				</div>
				<p>© {new Date().getFullYear()} GymFit. All rights reserved.</p>
			</footer>
		</div>
	</div>
{/if}

<style>
	.loader {
		border: 4px solid rgba(255, 255, 255, 0.2);
		border-left-color: #a855f7;
		border-radius: 50%;
		width: 40px;
		height: 40px;
		animation: spin 1s linear infinite;
	}
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
