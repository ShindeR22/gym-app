<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let plan;

	const dispatch = createEventDispatcher();

	function handleSelectPlan() {
		dispatch('planSelected', { plan }); // Clear, custom-named event
	}
</script>

<!-- The component UI -->
<div
	class="relative overflow-hidden rounded-xl border border-gray-700 bg-gray-800 shadow-lg {plan.popular
		? 'ring-2 ring-purple-500'
		: ''}"
>
	{#if plan.popular}
		<div class="absolute top-0 right-0 bg-purple-500 px-3 py-1 text-xs font-bold text-white">
			POPULAR
		</div>
	{/if}
	<div class="p-6">
		<h3 class="mb-2 text-xl font-bold">{plan.name}</h3>
		<div class="mb-4 flex items-baseline">
			<span class="text-2xl font-bold">${plan.price}</span>
			<span class="ml-1 text-gray-400">/{plan.duration}</span>
		</div>
		<ul class="mb-6 space-y-2">
			{#each plan.features as feature}
				<li class="flex items-center">
					<svg class="mr-2 h-4 w-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clip-rule="evenodd"
						></path>
					</svg>
					<span class="text-sm">{feature}</span>
				</li>
			{/each}
		</ul>
		<button
			on:click={handleSelectPlan}
			class="w-full rounded bg-gray-700 px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-600"
		>
			Select Plan
		</button>
	</div>
</div>
