<!-- MembershipTiers.svelte -->
<script lang="ts">
	import MembershipCard from '../components/MembershipCard.svelte';

	const tiers = [
		{
			name: 'Standard',
			price: 49,
			features: [
				'Access to gym equipment',
				'5 group classes per month',
				'Basic fitness assessment'
			],
			popular: false,
			link: '/membership/standard'
		},
		{
			name: 'Premium',
			price: 79,
			features: [
				'Unlimited gym access',
				'Unlimited group classes',
				'2 personal training sessions',
				'Full fitness assessment'
			],
			popular: true,
			link: '/membership/premium'
		},
		{
			name: 'Elite',
			price: 119,
			features: [
				'24/7 premium access',
				'Unlimited classes',
				'4 personal training sessions',
				'Personalized nutrition plan',
				'Exclusive lounge access'
			],
			popular: false,
			link: '/membership/elite'
		}
	];
</script>

<!-- Membership Tiers -->
<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
	{#each tiers as tier}
		<MembershipCard
			name={tier.name}
			price={tier.price}
			features={tier.features}
			popular={tier.popular}
			link={tier.link}
		/>
	{/each}
</div>
