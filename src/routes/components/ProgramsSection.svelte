<!-- ProgramsSection.svelte -->
<script lang="ts">
	import ProgramCard from '../components/ProgramCard.svelte';

	export let heading: string = 'Our Programs';

	const programs = [
		{
			title: 'Personal Training',
			description:
				'Work with certified trainers to create a personalized workout routine tailored to your fitness goals. Experience one-on-one support to push your limits.'
		},
		{
			title: 'Group Classes',
			description:
				'Join our energetic and engaging group classes for a dynamic workout experience. Stay motivated with peers and expert guidance.'
		},
		{
			title: 'Nutrition Guidance',
			description:
				'Complement your workout with professional nutrition advice. Discover meal plans and nutritional tips designed to enhance your overall health.'
		}
	];
</script>

<section class="bg-gray-100 px-8 py-16 text-black">
	<div class="mx-auto max-w-screen-xl">
		<!-- Section Heading -->
		<h2 class="mb-12 text-center text-4xl font-bold md:text-5xl">{heading}</h2>

		<!-- Program Cards -->
		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			{#each programs as program}
				<ProgramCard title={program.title} description={program.description} />
			{/each}
		</div>
	</div>
</section>
