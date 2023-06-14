<template>
    <div class="w-64 bg-white border-r">
      <div class="p-6">
        <h2 class="text-xl font-semibold text-gray-700">My Sidebar</h2>
        <ul class="mt-4 space-y-4">
          <li>
            <router-link to="/chat" class="flex items-center text-gray-600 hover:text-gray-800">
              <span class="ml-2">Chat</span>
            </router-link>
          </li>
          <li>
            <router-link to="/upload" class="flex items-center text-gray-600 hover:text-gray-800">
              <span class="ml-2">Upload</span>
            </router-link>
          </li>
          <li>
            <router-link to="/store" class="flex items-center text-gray-600 hover:text-gray-800">
              <span class="ml-2">Store</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Sidebar",
  };
  </script>
  
  <style scoped>
  </style>
  