<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar/>
    <div class="w-full overflow-auto">
      <header class="bg-blue-500 p-4 text-white text-xl font-bold fixed top-0 left-0 right-0 z-10 flex justify-between">
        <span>EC-Chatbot</span>
        <button @click="toggleDarkMode" class="text-white">
          Toggle Dark Mode
        </button>
      </header>
      <main class="mt-16 p-4">
        <div class="bg-white p-4 rounded-lg shadow-lg overflow-y-scroll h-[calc(100vh-250px)]">
          <router-view/>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "./components/Sidebar.vue";

const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark');
};
</script>

<style scoped></style>
