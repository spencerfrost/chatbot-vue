<template>
  <div class="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700">
    <div class="p-6">
      <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-300">EC-GPT</h2>
      <ul class="mt-6 space-y-4">
        <li>
          <router-link to="/chat" class="flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
            <span class="ml-2">Chat</span>
          </router-link>
        </li>
        <li>
          <router-link to="/loaders" class="flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
            <span class="ml-2">Document Loaders</span>
          </router-link>
        </li>
        <!-- <li>
          <router-link to="/store" class="flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
            <span class="ml-2">Store</span>
          </router-link>
        </li> -->
      </ul>
      <!-- An icon with position: absolute, bottom: 0  -->
      <div class="absolute bottom-0 my-6">
        <button @click="toggleDarkMode" class="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
          <i class="fa-solid fa-circle-half-stroke"></i>
        </button>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
  const toggleDarkMode = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
  };

</script>
