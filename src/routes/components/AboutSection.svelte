<!-- AboutSection.svelte -->
<script lang="ts">
	export let heading: string = 'Achieve Beyond Limits.';
	export let paragraph1: string =
		'Experience the ultimate fitness journey at BM Fitness. With personalized training and community support, our experts guide you toward a stronger, healthier, and happier you.';
	export let paragraph2: string =
		'At BM Fitness, we believe in setting ambitious goals and smashing them! Enjoy state-of-the-art equipment, exclusive classes, and a community that fuels your motivation every step of the way.';
	export let buttonText: string = 'JOIN NOW';
	export let buttonLink: string = '/signup';
</script>

<section class="bg-white px-8 py-16 text-black">
	<div class="mx-auto max-w-screen-xl">
		<!-- Heading -->
		<h2 class="mb-6 text-4xl font-bold md:text-5xl">{heading}</h2>

		<!-- Two-Column Text -->
		<div class="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
			<p class="text-lg leading-relaxed">
				{paragraph1}
			</p>
			<p class="text-lg leading-relaxed">
				{paragraph2}
			</p>
		</div>

		<!-- Call-to-Action Button -->
		<div class="text-center">
			<a
				href={buttonLink}
				class="inline-block bg-black px-8 py-3 font-medium text-white transition-colors hover:bg-gray-800"
			>
				{buttonText}
			</a>
		</div>
	</div>
</section>
