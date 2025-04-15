<script lang="ts">
	import AboutSection from './components/AboutSection.svelte';
	import ContactUsSection from './components/ContactUsSection.svelte';
	import Footer from './components/Footer.svelte';
	// import GetStartedSection from './components/GetStartedSection.svelte';
	import HeroSection from './components/HeroSection.svelte';
	import MembershipSection from './components/MembershipSection.svelte';
	// import OurPrograms from './components/OurPrograms.svelte';
	import ProgramsSection from './components/ProgramsSection.svelte';
	// import Testimonials from './components/Testimonials.svelte';

	// Add any TypeScript logic or imports here if needed.
	// For example, you might import a GymUser type or helper functions.
</script>

<section class=" relative bg-transparent">
	<!-- Hero Section -->
	<!-- Abstract Background Elements -->
	<div class="absolute inset-0 opacity-20">
		<div class="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-blue-500 blur-3xl"></div>
		<div class="absolute right-1/4 bottom-1/3 h-80 w-80 rounded-full bg-purple-600 blur-3xl"></div>
		<div class="absolute top-2/3 left-1/3 h-72 w-72 rounded-full bg-indigo-600 blur-3xl"></div>
	</div>

	<!-- Grid Pattern Overlay -->
	<div
		class="absolute inset-1 opacity-70"
		style="background-image: linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px); background-size: 20px 20px;"
	></div>

	<HeroSection />
	<AboutSection />
	<ProgramsSection />
	<MembershipSection />

	<!-- Get Started Section -->
	<!-- <GetStartedSection /> -->

	<!-- Our Programs Section -->
	<!-- <OurPrograms /> -->

	<!-- Testimonials Section -->
	<!-- <Testimonials /> -->

	<!-- Contact Us Section -->
	<ContactUsSection />

	<!-- Footer Section -->
	<Footer />
</section>
