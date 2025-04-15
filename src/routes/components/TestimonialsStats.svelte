<!-- TestimonialsStats.svelte -->
<script lang="ts">
	import Testimonial from '../components/Testimonial.svelte';
	import StatCard from '../components/StatCard.svelte';

	const stats = [
		{ value: '98%', label: 'Member satisfaction rate' },
		{ value: '24/7', label: 'Access for Elite members' },
		{ value: '50+', label: 'Weekly fitness classes' },
		{ value: '15+', label: 'Expert trainers' }
	];
</script>

<!-- Testimonials/Stats Section -->
<div class="mt-24 grid grid-cols-1 gap-16 md:grid-cols-2">
	<!-- Testimonial -->
	<div>
		<div class="mb-6 text-3xl font-bold">What Our Members Say</div>
		<Testimonial
			quote="Joining BM Fitness was the best decision I've made for my health. The Elite membership gives me access to world-class trainers and facilities. I've achieved fitness goals I never thought possible."
			name="Jennifer Miller"
			role="Elite Member · 1 year"
			initials="JM"
			rating={5}
		/>
	</div>

	<!-- Stats -->
	<div>
		<div class="mb-6 text-3xl font-bold">Why Choose Us</div>
		<div class="grid grid-cols-2 gap-6">
			{#each stats as stat}
				<StatCard value={stat.value} label={stat.label} />
			{/each}
		</div>
	</div>
</div>
