<!-- MembershipSection.svelte -->
<script lang="ts">
	import MembershipTiers from '../components/MembershipTiers.svelte';
	import TestimonialsStats from '../components/TestimonialsStats.svelte';
	import CallToAction from '../components/CallToAction.svelte';
</script>

<!-- Premium Membership Section -->
<section class="bg-gradient-to-br from-gray-300 to-black px-8 py-24 text-white">
	<div class="mx-auto max-w-screen-xl">
		<!-- Section Header -->
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-4xl font-bold md:text-5xl">Elite Membership</h2>
			<div class="mx-auto mb-6 h-1 w-24 bg-white"></div>
			<p class="mx-auto max-w-2xl text-xl text-gray-300">
				Elevate your fitness journey with exclusive perks and premium amenities
			</p>
		</div>

		<!-- Membership Tiers Component -->
		<MembershipTiers />

		<!-- Testimonials and Stats Component -->
		<TestimonialsStats />

		<!-- Call-to-Action Component -->
		<CallToAction />
	</div>
</section>
