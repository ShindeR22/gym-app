<script lang="ts">
	// User data interface
	interface UserProfile {
		id: string;
		name: string;
		email: string;
		profileImage: string;
		membershipStatus: string;
		plan: {
			name: string;
			startDate: string;
			endDate: string;
			timeSlot: string;
			progress: number;
		};
		dietPlan: {
			name: string;
			description: string;
			downloadLink: string;
		};
		payments: {
			amount: number;
			dueDate: string;
			status: string;
		}[];
	}

	// Gym plans interface
	interface GymPlan {
		id: string;
		name: string;
		duration: string;
		price: number;
		features: string[];
		popular: boolean;
	}

	// Mock user data
	const user: UserProfile = {
		id: 'user123',
		name: 'Alex Johnson',
		email: 'alex.johnson@example.com',
		profileImage: '/api/placeholder/100/100',
		membershipStatus: 'Active',
		plan: {
			name: 'Premium Fitness',
			startDate: '2025-03-01',
			endDate: '2025-09-01',
			timeSlot: 'Evening (6:00 PM - 8:00 PM)',
			progress: 35
		},
		dietPlan: {
			name: 'High Protein Diet',
			description: 'Balanced nutrition plan optimized for muscle growth',
			downloadLink: '#'
		},
		payments: [
			{
				amount: 89.99,
				dueDate: '2025-05-01',
				status: 'Pending'
			}
		]
	};

	// Mock gym plans
	const gymPlans: GymPlan[] = [
		{
			id: 'basic',
			name: 'Basic Fit',
			duration: '1 Month',
			price: 49.99,
			features: ['Access to gym equipment', 'Basic fitness assessment', 'Mobile app access'],
			popular: false
		},
		{
			id: 'pro',
			name: 'Pro Fitness',
			duration: '3 Months',
			price: 129.99,
			features: [
				'All Basic features',
				'2 Personal training sessions',
				'Nutrition consultation',
				'Group classes'
			],
			popular: true
		},
		{
			id: 'elite',
			name: 'Elite Performance',
			duration: '6 Months',
			price: 249.99,
			features: [
				'All Pro features',
				'Unlimited personal training',
				'Custom diet plans',
				'Recovery sessions',
				'Performance tracking'
			],
			popular: false
		}
	];

	// Format date function
	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
	}

	// Days remaining calculation
	function getDaysRemaining(endDate: string): number {
		const end = new Date(endDate);
		const now = new Date();
		const diffTime = end.getTime() - now.getTime();
		return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	}
</script>

<!-- // This is a SvelteKit component file (dashboard.svelte) -->
<div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
	<!-- Navigation -->
	<nav class="border-b border-gray-800 bg-gray-900 px-6 py-4">
		<div class="flex items-center justify-between">
			<div class="flex items-center space-x-2">
				<span class="text-xl font-bold text-purple-500">GymFit</span>
				<span class="text-sm text-gray-400">Premium</span>
			</div>
			<div class="flex items-center space-x-4">
				<button class="text-gray-400 hover:text-white">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
						/>
					</svg>
				</button>
				<div class="flex items-center space-x-3">
					<img
						src={user.profileImage}
						alt="Profile"
						class="h-8 w-8 rounded-full border-2 border-purple-500"
					/>
					<span class="font-medium">{user.name}</span>
				</div>
			</div>
		</div>
	</nav>

	<!-- Main Content -->
	<div class="container mx-auto px-4 py-8">
		<!-- Page Header -->
		<div class="mb-8 flex items-center justify-between">
			<h1 class="text-2xl font-bold">My Dashboard</h1>
			<div>
				<span class="rounded-lg bg-purple-600 px-4 py-2 font-medium text-white"
					>{user.membershipStatus}</span
				>
			</div>
		</div>

		<!-- Dashboard Grid -->
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
			<!-- User Profile Card -->
			<div class="rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-lg">
				<div class="mb-6 flex items-center space-x-4">
					<img
						src={user.profileImage}
						alt="Profile"
						class="h-16 w-16 rounded-full border-2 border-purple-500"
					/>
					<div>
						<h2 class="text-xl font-bold">{user.name}</h2>
						<p class="text-gray-400">{user.email}</p>
					</div>
				</div>
				<div class="border-t border-gray-700 pt-4">
					<h3 class="mb-2 font-medium text-gray-300">Personal Information</h3>
					<button
						class="mt-3 w-full rounded bg-gray-700 px-4 py-2 text-sm text-white transition-colors duration-200 hover:bg-gray-600"
					>
						Edit Profile
					</button>
				</div>
			</div>

			<!-- Membership Details -->
			<div class="rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-lg">
				<h2 class="mb-4 text-xl font-bold">Membership Plan</h2>
				<div class="mb-4">
					<div class="mb-1 flex justify-between text-sm">
						<span class="text-gray-400">Plan:</span>
						<span class="font-medium">{user.plan.name}</span>
					</div>
					<div class="mb-1 flex justify-between text-sm">
						<span class="text-gray-400">Start Date:</span>
						<span>{formatDate(user.plan.startDate)}</span>
					</div>
					<div class="mb-1 flex justify-between text-sm">
						<span class="text-gray-400">End Date:</span>
						<span>{formatDate(user.plan.endDate)}</span>
					</div>
					<div class="mb-1 flex justify-between text-sm">
						<span class="text-gray-400">Time Slot:</span>
						<span>{user.plan.timeSlot}</span>
					</div>
				</div>
				<div class="mt-4">
					<div class="mb-1 flex justify-between">
						<span class="text-sm text-gray-400">Plan progress</span>
						<span class="text-sm text-gray-400">{user.plan.progress}%</span>
					</div>
					<div class="h-2 w-full rounded-full bg-gray-700">
						<div class="h-2 rounded-full bg-purple-500" style="width: {user.plan.progress}%"></div>
					</div>
					<div class="mt-1 text-right text-sm text-gray-400">
						{getDaysRemaining(user.plan.endDate)} days remaining
					</div>
				</div>
			</div>

			<!-- Diet Plan & Payments -->
			<div class="rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-lg">
				<div class="mb-6">
					<h2 class="mb-4 text-xl font-bold">Diet Plan</h2>
					<div class="rounded-lg bg-gray-700 p-4">
						<h3 class="text-lg font-medium">{user.dietPlan.name}</h3>
						<p class="mt-1 text-sm text-gray-400">{user.dietPlan.description}</p>
						<a
							href={user.dietPlan.downloadLink}
							class="mt-3 inline-block rounded bg-purple-600 px-4 py-2 text-sm text-white transition-colors duration-200 hover:bg-purple-700"
						>
							Download Plan
						</a>
					</div>
				</div>
				<div class="border-t border-gray-700 pt-4">
					<h2 class="mb-4 text-xl font-bold">Payment Due</h2>
					{#each user.payments as payment}
						{#if payment.status === 'Pending'}
							<div class="rounded-lg bg-gray-700 p-4">
								<div class="mb-2 flex justify-between">
									<span class="text-gray-300">Amount Due:</span>
									<span class="font-bold">${payment.amount}</span>
								</div>
								<div class="mb-3 flex justify-between">
									<span class="text-gray-300">Due Date:</span>
									<span>{formatDate(payment.dueDate)}</span>
								</div>
								<button
									class="w-full rounded bg-purple-600 px-4 py-2 text-sm text-white transition-colors duration-200 hover:bg-purple-700"
								>
									Pay Now
								</button>
							</div>
						{/if}
					{/each}
				</div>
			</div>
		</div>

		<!-- Gym Plans Section -->
		<div class="mt-10">
			<h2 class="mb-6 text-2xl font-bold">Explore Our Plans</h2>
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each gymPlans as plan}
					<div
						class="relative overflow-hidden rounded-xl border border-gray-700 bg-gray-800 shadow-lg {plan.popular
							? 'ring-2 ring-purple-500'
							: ''}"
					>
						{#if plan.popular}
							<div
								class="absolute top-0 right-0 bg-purple-500 px-3 py-1 text-xs font-bold text-white"
							>
								POPULAR
							</div>
						{/if}
						<div class="p-6">
							<h3 class="mb-2 text-xl font-bold">{plan.name}</h3>
							<div class="mb-4 flex items-baseline">
								<span class="text-2xl font-bold">${plan.price}</span>
								<span class="ml-1 text-gray-400">/{plan.duration}</span>
							</div>
							<ul class="mb-6 space-y-2">
								{#each plan.features as feature}
									<li class="flex items-center">
										<svg
											class="mr-2 h-4 w-4 text-purple-500"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fill-rule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
												clip-rule="evenodd"
											></path>
										</svg>
										<span class="text-sm">{feature}</span>
									</li>
								{/each}
							</ul>
							<button
								class="w-full rounded bg-gray-700 px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-600"
							>
								Select Plan
							</button>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
