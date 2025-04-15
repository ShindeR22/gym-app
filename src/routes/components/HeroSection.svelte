<!-- HeroSection.svelte -->
<script lang="ts">
	export let backgroundImage: string =
		'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
	export let title: string = 'Welcome to Your Gym';
	export let subtitle: string = 'Train hard, live better';
</script>

<section
	class="flex h-screen items-center justify-center bg-cover bg-center"
	style="background-image: url('{backgroundImage}');"
>
	<div class="bg-opacity-50 rounded bg-black p-6 text-center">
		<h2 class="mb-4 text-4xl font-bold text-white md:text-6xl">{title}</h2>
		<p class="text-xl text-gray-200 md:text-2xl">{subtitle}</p>
	</div>
</section>
