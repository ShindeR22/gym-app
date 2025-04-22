<script lang="ts">
	import { user, notifications, showNotifications } from '../../../lib/stores';
	import type { Notification } from '../../../lib/types';

	function toggleNotifications() {
		showNotifications.update((value) => !value);
	}

	function getUnreadCount(notifs: Notification[]): number {
		return notifs.filter((n) => !n.read).length;
	}

	function markAllAsRead() {
		notifications.update((notifs) => notifs.map((n) => ({ ...n, read: true })));
	}

	$: unreadCount = getUnreadCount($notifications);
</script>

<nav class="border-b border-gray-800 bg-gray-900 px-6 py-4">
	<div class="flex items-center justify-between">
		<div class="flex items-center space-x-2">
			<span class="text-xl font-bold text-purple-500">GymFit</span>
			<span class="text-sm text-gray-400">Premium</span>
		</div>
		<div class="flex items-center space-x-4">
			<div class="relative">
				<button class="text-gray-400 hover:text-white" on:click={toggleNotifications}>
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
				{#if unreadCount > 0}
					<span
						class="absolute -top-1 -right-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white"
					>
						{unreadCount}
					</span>
				{/if}

				{#if $showNotifications}
					<div
						class="absolute top-8 right-0 z-10 w-72 rounded-lg border border-gray-700 bg-gray-800 shadow-lg"
					>
						<div class="flex items-center justify-between border-b border-gray-700 p-3">
							<h3 class="font-medium">Notifications</h3>
							<button
								on:click={markAllAsRead}
								class="text-xs text-purple-400 hover:text-purple-300"
							>
								Mark all as read
							</button>
						</div>
						<div class="max-h-80 overflow-y-auto">
							{#if $notifications.length === 0}
								<div class="p-4 text-center text-gray-400">No notifications</div>
							{:else}
								{#each $notifications as notification}
									<div
										class="border-b border-gray-700 p-3 {notification.read ? '' : 'bg-gray-700'}"
									>
										<div class="flex items-start">
											<div class="mr-3 flex-shrink-0">
												{#if notification.type === 'payment'}
													<div class="rounded-full bg-red-500 p-1">
														<svg class="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
															<path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path>
															<path
																fill-rule="evenodd"
																d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
																clip-rule="evenodd"
															></path>
														</svg>
													</div>
												{:else if notification.type === 'workout'}
													<div class="rounded-full bg-blue-500 p-1">
														<svg class="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
															<path
																fill-rule="evenodd"
																d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
																clip-rule="evenodd"
															></path>
														</svg>
													</div>
												{:else if notification.type === 'achievement'}
													<div class="rounded-full bg-yellow-500 p-1">
														<svg class="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
															<path
																d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
															></path>
														</svg>
													</div>
												{:else}
													<div class="rounded-full bg-green-500 p-1">
														<svg class="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
															<path
																fill-rule="evenodd"
																d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
																clip-rule="evenodd"
															></path>
														</svg>
													</div>
												{/if}
											</div>
											<div class="flex-1">
												<h4 class="text-sm font-medium">{notification.title}</h4>
												<p class="text-xs text-gray-400">{notification.message}</p>
												<p class="mt-1 text-xs text-gray-500">{notification.date}</p>
											</div>
										</div>
									</div>
								{/each}
							{/if}
						</div>
						<a
							href="/notifications"
							class="block border-t border-gray-700 p-3 text-center text-xs text-purple-400 hover:text-purple-300"
						>
							View all notifications
						</a>
					</div>
				{/if}
			</div>
			<div class="flex items-center space-x-3">
				<img
					src={$user.profileImage}
					alt="Profile"
					class="h-8 w-8 rounded-full border-2 border-purple-500"
				/>
				<span class="font-medium">{$user.name}</span>
			</div>
		</div>
	</div>
</nav>
