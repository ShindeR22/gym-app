<script lang="ts">
	import { user } from '../../../lib/stores';
	import { formatDate, getDaysRemaining } from '../../../lib/utils';

	// Compute progress reactively based on startDate and endDate
	$: progress = $user.plan ? calculateProgress($user.plan) : 0;

	function calculateProgress(plan) {
		const start = new Date(plan.startDate);
		const end = new Date(plan.endDate);
		const now = new Date();
		const total = end - start;
		const elapsed = now - start;
		return Math.min(100, Math.max(0, (elapsed / total) * 100));
	}
</script>

<div class="rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-lg">
	<h2 class="mb-4 text-xl font-bold">Membership Plan</h2>
	<div class="mb-4">
		<div class="mb-1 flex justify-between text-sm">
			<span class="text-gray-400">Plan:</span>
			<span class="font-medium">{$user.plan.name}</span>
		</div>
		<div class="mb-1 flex justify-between text-sm">
			<span class="text-gray-400">Start Date:</span>
			<span>{formatDate($user.plan.startDate)}</span>
		</div>
		<div class="mb-1 flex justify-between text-sm">
			<span class="text-gray-400">End Date:</span>
			<span>{formatDate($user.plan.endDate)}</span>
		</div>
		<div class="mb-1 flex justify-between text-sm">
			<span class="text-gray-400">Time Slot:</span>
			<span>{$user.plan.timeSlot}</span>
		</div>
	</div>
	<div class="mt-4">
		<div class="mb-1 flex justify-between">
			<span class="text-sm text-gray-400">Plan progress</span>
			<span class="text-sm text-gray-400">{progress.toFixed(1)}%</span>
		</div>
		<div class="h-2 w-full rounded-full bg-gray-700">
			<div class="h-2 rounded-full bg-purple-500" style="width: {progress}%"></div>
		</div>
		<div class="mt-1 text-right text-sm text-gray-400">
			{getDaysRemaining($user.plan.endDate)} days remaining
		</div>
	</div>
</div>
