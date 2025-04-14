<!-- LoginPage.svelte -->
<script lang="ts">
  import { goto } from '$app/navigation';
  import NavBar from '../components/NavBar.svelte';

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
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-10">
    <div class="bg-white p-8 rounded-2xl shadow-lg space-y-6">
      <h2 class="text-3xl font-bold text-gray-800">Login Successful</h2>
      <p class="text-gray-600">Welcome, {email}</p>
      <button 
        on:click={logout}
        class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      >
        Logout
      </button>
    </div>
  </div>
{:else}
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
    <div class="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg space-y-6">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-800">Welcome 👋</h2>
        <p class="text-sm text-gray-500 mt-2">Please sign in to your account</p>
      </div>

      <button
        on:click={handleGoogleLogin}
        class="flex items-center justify-center gap-3 w-full py-2 bg-white border border-gray-300 text-gray-700 rounded-lg shadow-sm hover:shadow transition"
      >
        Continue with Google
      </button>

      {#if errorMessage}
        <div class="text-sm text-red-600 text-center">{errorMessage}</div>
      {/if}

      <div class="flex items-center justify-center gap-2">
        <span class="h-px flex-1 bg-gray-300"></span>
        <span class="text-gray-400 text-sm">OR</span>
        <span class="h-px flex-1 bg-gray-300"></span>
      </div>

      <form on:submit|preventDefault={handleLogin} class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            type="email"
            bind:value={email}
            required
            placeholder="you@example.com"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            id="password"
            type="password"
            bind:value={password}
            required
            placeholder="••••••••"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div class="text-right text-sm">
          <a href="/forgot-password" class="text-blue-600 hover:underline">Forgot Password?</a>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>

      <div class="text-center text-sm text-gray-600 pt-2">
        Don't have an account?
        <a href="/register" class="text-blue-600 hover:underline">Sign Up</a>
      </div>
    </div>
  </div>
{/if}
