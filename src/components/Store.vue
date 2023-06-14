<template>
    <div class="border rounded-lg p-4 mb-4">
      <h3 class="text-lg font-bold mb-2">A page to display stats about our vector store & more</h3>
      <div v-if="indexStats">
        <h4>Index Stats:</h4>
        <pre>{{ indexStats }}</pre>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const indexStats = ref(null);
  
  onMounted(async () => {
    try {
      const response = await axios.get('/api/index-stats');
      indexStats.value = response.data;
    } catch (error) {
      console.error(error);
    }
  });
  </script>
  