<!-- CallToAction.svelte -->
<script lang="ts">
	// You can add props here if you want to make this component more configurable
</script>

<!-- Call-to-Action -->
<div class="mt-24 text-center">
	<h3 class="mb-6 text-3xl font-bold">Ready to Transform Your Fitness Journey?</h3>
	<p class="mx-auto mb-8 max-w-2xl text-xl text-gray-300">
		Join BM Fitness today and experience premium fitness services tailored to your goals.
	</p>
	<div class="flex flex-col justify-center gap-4 sm:flex-row">
		<a
			href="/tour"
			class="inline-block border border-white px-8 py-3 font-medium text-white transition-colors hover:bg-white hover:text-black"
		>
			BOOK A TOUR
		</a>
		<a
			href="/signup"
			class="inline-block bg-white px-8 py-3 font-medium text-black transition-colors hover:bg-gray-200"
		>
			JOIN NOW
		</a>
	</div>
</div>
