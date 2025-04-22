<script lang="ts">
	import { user } from '../../../lib/stores';
</script>

<div class="rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-lg">
	<div class="mb-6 flex items-center space-x-4">
		<img
			src={$user.profileImage}
			alt="Profile"
			class="h-16 w-16 rounded-full border-2 border-purple-500"
		/>
		<div>
			<h2 class="text-xl font-bold">{$user.name}</h2>
			<p class="text-gray-400">{$user.email}</p>
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
