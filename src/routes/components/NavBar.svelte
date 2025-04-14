<script lang="ts">
  import { onMount } from 'svelte';
  // import { goto } from '$app/navigation';

  // export let loggedIn = true;
  // export let logout: () => void;

  let showDropdown = false;

  const toggleDropdown = () => {
    showDropdown = !showDropdown;
  };

  const closeDropdown = () => {
    showDropdown = false;
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (!(event.target as HTMLElement).closest('#profileDropdown')) {
      closeDropdown();
    }
  };

  // New logout handler that calls the logout function and then redirects to home.
  // const handleLogout = () => {
  //   logout();
  //   goto('/');
  // };

  onMount(() => {
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  });
</script>

<nav class="bg-gray-800 text-white p-4 relative">
  <div class="container mx-auto flex justify-between items-center">
    <h1 class="text-2xl font-bold">BM Fitness</h1>
    <ul class="flex space-x-6 items-center">
      <li><a href="/" class="hover:underline">Home</a></li>
      <li><a href="/about" class="hover:underline">About</a></li>
      <li><a href="/classes" class="hover:underline">Classes</a></li>
      <li><a href="/contact" class="hover:underline">Contact</a></li>
      
      <!-- Profile Dropdown -->
      <li class="relative" id="profileDropdown">
        <button
          class="ml-4 focus:outline-none"
          on:click={toggleDropdown}
          aria-label="User menu"
          title="User Menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
               viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M5.121 17.804A7 7 0 0112 15a7 7 0 016.879 2.804M15 11a3 3 0 10-6 0 3 3 0 006 0z"/>
          </svg>
        </button>

        <!-- {#if showDropdown}
          <div class="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-50">
            {#if loggedIn}
              <button on:click={handleLogout} class="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
            {:else}
              <a href="/login" class="block px-4 py-2 hover:bg-gray-100">Login</a>
            {/if}
          </div>
        {/if} -->
      </li>
    </ul>
  </div>
</nav>
