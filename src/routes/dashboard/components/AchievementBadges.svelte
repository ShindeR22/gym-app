<script lang="ts">
	const badges = [
		{
			id: 'first-workout',
			name: 'First Step',
			description: 'Completed your first workout',
			earned: true,
			icon: '🏋️'
		},
		{
			id: 'streak-week',
			name: '7 Day Streak',
			description: 'Worked out for 7 days in a row',
			earned: true,
			icon: '🔥'
		},
		{
			id: 'weight-goal',
			name: 'Weight Goal',
			description: 'Reached your weight goal',
			earned: false,
			icon: '⚖️'
		},
		{
			id: 'nutrition-perfect',
			name: 'Nutrition Master',
			description: 'Perfectly hit all macros for 5 days',
			earned: false,
			icon: '🥗'
		}
	];
</script>

<div class="rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-lg">
	<h2 class="mb-4 text-xl font-bold">Achievement Badges</h2>

	<div class="grid grid-cols-2 gap-4">
		{#each badges as badge}
			<div
				class="rounded-lg border border-gray-700 p-4 {badge.earned
					? 'bg-gray-700'
					: 'bg-gray-800 opacity-50'}"
			>
				<div class="mb-3 flex items-center justify-center text-3xl">
					{badge.icon}
				</div>
				<h3 class="text-center text-lg font-medium">
					{badge.name}
				</h3>
				<p class="text-center text-xs text-gray-400">
					{badge.description}
				</p>
				{#if badge.earned}
					<div class="mt-2 text-center text-xs text-green-400">✓ Earned</div>
				{:else}
					<div class="mt-2 text-center text-xs text-gray-500">Locked</div>
				{/if}
			</div>
		{/each}
	</div>

	<div class="mt-4 text-center text-sm text-gray-400">
		<a href="/achievements" class="text-purple-400 hover:text-purple-300">View all achievements</a>
	</div>
</div>
