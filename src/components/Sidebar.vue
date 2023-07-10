<template>
  <div class="w-64 bg-gray-800 border-r border-gray-700">
    <div class="p-6">
      <h2 class="text-xl font-semibold text-gray-300">EC-GPT</h2>
      <ul class="mt-6 space-y-4">
        <li>
          <router-link to="/chat" class="flex items-center text-gray-400 hover:text-gray-200">
            <span class="ml-2">Chat</span>
          </router-link>
        </li>
        <li>
          <router-link to="/loaders" class="flex items-center text-gray-400 hover:text-gray-200">
            <span class="ml-2">Document Loaders</span>
          </router-link>
        </li>
        <li>
          <router-link to="/debug" class="flex items-center text-gray-400 hover:text-gray-200">
            <span class="ml-2">Debug</span>
          </router-link>
        </li>
        <!-- <li>
          <router-link to="/store" class="flex items-center text-gray-400 hover:text-gray-200">
            <span class="ml-2">Store</span>
          </router-link>
        </li> -->
      </ul>
    </div>
  </div>
</template>
  
<script setup lang="ts">

</script>
