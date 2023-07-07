<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900">
    <Sidebar/>
    <div class="w-full overflow-auto">
      <Header />
      <main class="p-4">
        <router-view/>
      </main>
    </div>
  </div>
</template>


<script setup lang="ts">
import Sidebar from "./components/Sidebar.vue";
import Header from "./components/Header.vue";

// on mounted check local storage for theme
if (localStorage.theme === 'dark') {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}
</script>

<style scoped></style>
