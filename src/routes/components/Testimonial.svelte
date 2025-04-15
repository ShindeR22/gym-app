<!-- Testimonial.svelte -->
<script lang="ts">
	export let quote: string;
	export let name: string;
	export let role: string;
	export let initials: string;
	export let rating: number = 5;
</script>

<div class="bg-opacity-5 rounded-lg p-8">
	<div class="mb-4 flex">
		<div class="flex">
			{#each Array(rating) as _, i}
				<svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
					<path
						d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
					></path>
				</svg>
			{/each}
		</div>
	</div>
	<blockquote class="mb-4 text-lg text-gray-300 italic">
		"{quote}"
	</blockquote>
	<div class="flex items-center">
		<div class="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-600">
			<span class="text-lg font-bold">{initials}</span>
		</div>
		<div>
			<p class="font-bold">{name}</p>
			<p class="text-sm text-gray-400">{role}</p>
		</div>
	</div>
</div>
