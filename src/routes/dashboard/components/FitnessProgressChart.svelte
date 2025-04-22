<script lang="ts">
	import { user } from '../../../lib/stores';
	import { onMount } from 'svelte';

	// “!” tells TS this will be assigned by Svelte before use
	let chartElement!: HTMLCanvasElement;
	let chart: any;

	onMount(() => {
		// now TS knows chartElement is HTMLCanvasElement
		const ctx = chartElement.getContext('2d');
		if (!ctx) return;

		// Draw axis
		ctx.beginPath();
		ctx.strokeStyle = '#4B5563';
		ctx.moveTo(40, 20);
		ctx.lineTo(40, 180);
		ctx.lineTo(280, 180);
		ctx.stroke();

		// Draw weight line
		if ($user.stats && $user.stats.weight.length > 0) {
			const weights = $user.stats.weight;
			const maxWeight = Math.max(...weights) + 2;
			const minWeight = Math.min(...weights) - 2;
			const range = maxWeight - minWeight;

			ctx.beginPath();
			ctx.strokeStyle = '#8B5CF6';
			ctx.lineWidth = 2;

			for (let i = 0; i < weights.length; i++) {
				const x = 40 + i * (240 / (weights.length - 1));
				const y = 180 - ((weights[i] - minWeight) / range) * 160;

				if (i === 0) {
					ctx.moveTo(x, y);
				} else {
					ctx.lineTo(x, y);
				}
			}
			ctx.stroke();

			// Add data points
			for (let i = 0; i < weights.length; i++) {
				const x = 40 + i * (240 / (weights.length - 1));
				const y = 180 - ((weights[i] - minWeight) / range) * 160;

				ctx.beginPath();
				ctx.arc(x, y, 4, 0, 2 * Math.PI);
				ctx.fillStyle = '#8B5CF6';
				ctx.fill();
			}
		}
	});
</script>

<div class="rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-lg">
	<h2 class="mb-4 text-xl font-bold">Fitness Progress</h2>

	{#if $user.stats}
		<div class="mb-4 flex justify-between">
			<div class="text-center">
				<div class="text-2xl font-bold text-purple-500">
					{$user.stats.workoutsCompleted}
				</div>
				<div class="text-xs text-gray-400">Workouts</div>
			</div>
			<div class="text-center">
				<div class="text-2xl font-bold text-purple-500">
					{$user.stats.caloriesBurned.toLocaleString()}
				</div>
				<div class="text-xs text-gray-400">Cal Burned</div>
			</div>
			<div class="text-center">
				<div class="text-2xl font-bold text-purple-500">
					{$user.stats.weight[$user.stats.weight.length - 1]} kg
				</div>
				<div class="text-xs text-gray-400">Current Weight</div>
			</div>
		</div>

		<div class="mb-2 flex justify-between text-sm text-gray-400">
			<span>Weight Tracker</span>
			<span>
				{$user.stats.weight[0]} kg →
				{$user.stats.weight[$user.stats.weight.length - 1]} kg
			</span>
		</div>

		<div class="relative h-48 w-full rounded-lg bg-gray-900">
			<canvas bind:this={chartElement} width="280" height="200"></canvas>
			<div class="absolute right-0 bottom-2 left-0 text-center text-xs text-gray-500">
				Last 6 months
			</div>
		</div>
	{:else}
		<p class="text-gray-400">No fitness data available yet.</p>
	{/if}

	<button class="mt-4 w-full rounded bg-gray-700 px-4 py-2 text-sm text-white hover:bg-gray-600">
		Log Weight
	</button>
</div>
