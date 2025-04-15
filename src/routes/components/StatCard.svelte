<!-- StatCard.svelte -->
<script lang="ts">
	export let value: string;
	export let label: string;
</script>

<div class="bg-opacity-5 rounded-lg p-6">
	<div class="mb-2 text-4xl font-bold">{value}</div>
	<p class="text-gray-300">{label}</p>
</div>
