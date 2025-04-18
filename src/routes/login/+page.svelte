<!-- LoginPage.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	// import NavBar from '../components/NavBar.svelte';

	let email = '';
	let password = '';
	let errorMessage = '';
	let loggedIn = false;

	const handleLogin = () => {
		errorMessage = '';

		if (!email || !password) {
			errorMessage = 'Both email and password are required.';
			return;
		}

		if (email !== 'rushikeshshinde2205@gmail.com' || password !== 'Rushikesh@22') {
			errorMessage = 'Invalid email or password.';
		} else {
			loggedIn = true;
			console.log('Logged in with', email, password);
			goto('/user');
		}
	};

	const handleGoogleLogin = () => {
		console.log('Redirecting to Google Login...');
	};

	// Updated logout function: sets loggedIn to false
	const logout = () => {
		loggedIn = false;
		email = '';
		password = '';
		errorMessage = '';
	};
</script>

<!-- <NavBar {loggedIn} {logout} /> -->

{#if loggedIn}
	<div class="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-10">
		<div class="space-y-6 rounded-2xl bg-white p-8 shadow-lg">
			<h2 class="text-3xl font-bold text-gray-800">Login Successful</h2>
			<p class="text-gray-600">Welcome, {email}</p>
			<button
				on:click={logout}
				class="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
			>
				Logout
			</button>
		</div>
	</div>
{:else}
	<div class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
		<div class="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-lg">
			<div class="text-center">
				<h2 class="text-3xl font-bold text-gray-800">Welcome 👋</h2>
				<p class="mt-2 text-sm text-gray-500">Please sign in to your account</p>
			</div>

			<button
				on:click={handleGoogleLogin}
				class="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white py-2 text-gray-700 shadow-sm transition hover:shadow"
			>
				Continue with Google
			</button>

			{#if errorMessage}
				<div class="text-center text-sm text-red-600">{errorMessage}</div>
			{/if}

			<div class="flex items-center justify-center gap-2">
				<span class="h-px flex-1 bg-gray-300"></span>
				<span class="text-sm text-gray-400">OR</span>
				<span class="h-px flex-1 bg-gray-300"></span>
			</div>

			<form on:submit|preventDefault={handleLogin} class="space-y-4">
				<div>
					<label for="email" class="mb-1 block text-sm font-medium text-gray-700">Email</label>
					<input
						id="email"
						type="email"
						bind:value={email}
						required
						placeholder="you@example.com"
						class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					/>
				</div>

				<div>
					<label for="password" class="mb-1 block text-sm font-medium text-gray-700">Password</label
					>
					<input
						id="password"
						type="password"
						bind:value={password}
						required
						placeholder="••••••••"
						class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					/>
				</div>

				<div class="text-right text-sm">
					<a href="/forgot-password" class="text-blue-600 hover:underline">Forgot Password?</a>
				</div>

				<button
					type="submit"
					class="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
				>
					Login
				</button>
			</form>

			<div class="pt-2 text-center text-sm text-gray-600">
				Don't have an account?
				<a href="/register" class="text-blue-600 hover:underline">Sign Up</a>
			</div>
		</div>
	</div>
{/if}
