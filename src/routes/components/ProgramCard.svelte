<!-- ProgramCard.svelte -->
<script lang="ts">
	export let title: string;
	export let description: string;
</script>

<div class="rounded-lg p-6 shadow-md">
	<h3 class="mb-4 text-2xl font-bold">{title}</h3>
	<p class="text-lg">
		{description}
	</p>
</div>
