<!-- MembershipCard.svelte -->
<script lang="ts">
	export let name: string;
	export let price: number;
	export let features: string[];
	export let popular: boolean = false;
	export let link: string;
</script>

<div
	class=" bg-opacity-{popular
		? '15'
		: '10'} relative rounded-lg border-2 border-gray-300 p-8 shadow-xl backdrop-blur-lg backdrop-filter transition-all duration-300 hover:-translate-y-2 hover:transform"
>
	{#if popular}
		<div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
			<span class="rounded-full border-2 bg-gray-300 px-4 py-1 text-sm font-bold text-black"
				>MOST POPULAR</span
			>
		</div>
	{/if}
	<div class="mb-6 text-center">
		<h3 class="mb-2 text-2xl font-bold">{name}</h3>
		<div class="text-3xl font-bold">
			<span class="align-top text-lg">$</span>{price}<span class="text-lg">/mo</span>
		</div>
	</div>
	<ul class="mb-8 space-y-4">
		{#each features as feature}
			<li class="flex items-center">
				<svg class="mr-2 h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
					<path
						fill-rule="evenodd"
						d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
						clip-rule="evenodd"
					></path>
				</svg>
				{feature}
			</li>
		{/each}
	</ul>
	<div class="text-center">
		<a
			href={link}
			class="inline-block {popular
				? 'bg-white text-black hover:bg-gray-200'
				: 'border border-white text-white hover:bg-white hover:text-black'} w-full px-6 py-3 font-medium transition-colors"
		>
			Select Plan
		</a>
	</div>
</div>
