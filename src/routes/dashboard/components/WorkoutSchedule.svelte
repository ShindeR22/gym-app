<script lang="ts">
	import { workoutSessions } from '../../../lib/stores';

	function getStatusColor(status: string): string {
		switch (status) {
			case 'upcoming':
				return 'text-blue-400';
			case 'completed':
				return 'text-green-400';
			case 'canceled':
				return 'text-red-400';
			default:
				return 'text-gray-400';
		}
	}
</script>

<div class="rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-lg">
	<h2 class="mb-4 text-xl font-bold">Upcoming Workouts</h2>

	{#if $workoutSessions.length === 0}
		<p class="text-gray-400">No scheduled workouts</p>
	{:else}
		<div class="space-y-4">
			{#each $workoutSessions.filter((session) => session.status === 'upcoming') as session}
				<div class="rounded-lg border border-gray-700 p-4">
					<div class="flex justify-between">
						<h3 class="font-medium">{session.name}</h3>
						<span class={getStatusColor(session.status)}>{session.status}</span>
					</div>
					<div class="mt-2 grid grid-cols-2 gap-2 text-sm">
						<div class="text-gray-400">Trainer:</div>
						<div>{session.trainer}</div>
						<div class="text-gray-400">Date:</div>
						<div>{session.date}</div>
						<div class="text-gray-400">Time:</div>
						<div>{session.time}</div>
						<div class="text-gray-400">Duration:</div>
						<div>{session.duration}</div>
					</div>
					<div class="mt-4 flex space-x-2">
						<button
							class="flex-1 rounded bg-purple-600 px-3 py-1 text-sm text-white hover:bg-purple-700"
						>
							Reschedule
						</button>
						<button
							class="flex-1 rounded bg-gray-700 px-3 py-1 text-sm text-white hover:bg-gray-600"
						>
							Cancel
						</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}

	<button
		class="mt-4 w-full rounded border border-purple-500 px-4 py-2 text-sm text-purple-500 hover:bg-purple-500 hover:text-white"
	>
		Book New Session
	</button>
</div>
