<script lang="ts">
	import { user } from '../../../lib/stores';
	import { formatDate } from '../../../lib/utils';
</script>

<div class="rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-lg">
	<div class="mb-6">
		<h2 class="mb-4 text-xl font-bold">Diet Plan</h2>
		<div class="rounded-lg bg-gray-700 p-4">
			<h3 class="text-lg font-medium">{$user.dietPlan.name}</h3>
			<p class="mt-1 text-sm text-gray-400">{$user.dietPlan.description}</p>
			<a
				href={$user.dietPlan.downloadLink}
				class="mt-3 inline-block rounded bg-purple-600 px-4 py-2 text-sm text-white transition-colors duration-200 hover:bg-purple-700"
			>
				Download Plan
			</a>
		</div>
	</div>
	<div class="border-t border-gray-700 pt-4">
		<h2 class="mb-4 text-xl font-bold">Payment Due</h2>
		{#each $user.payments as payment}
			{#if payment.status === 'Pending'}
				<div class="rounded-lg bg-gray-700 p-4">
					<div class="mb-2 flex justify-between">
						<span class="text-gray-300">Amount Due:</span>
						<span class="font-bold">${payment.amount}</span>
					</div>
					<div class="mb-3 flex justify-between">
						<span class="text-gray-300">Due Date:</span>
						<span>{formatDate(payment.dueDate)}</span>
					</div>
					<button
						class="w-full rounded bg-purple-600 px-4 py-2 text-sm text-white transition-colors duration-200 hover:bg-purple-700"
					>
						Pay Now
					</button>
				</div>
			{/if}
		{/each}
	</div>
</div>
