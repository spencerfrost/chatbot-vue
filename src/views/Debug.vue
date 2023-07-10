<template>
    <div class="flex justify-center p-4">
        <div class="container w-6/12 border rounded-lg text-center p-4 mt-8 bg-gray-800">
            <h3 class="text-lg font-bold mb-2 text-gray-300">
                Similarity Search
            </h3>
            <div class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 relative mb-4" role="alert">
                <div><strong class="font-bold">Incomplete feature</strong></div>
                <span class="block sm:inline">This feature is still in development. It will only output in the console.</span>
            </div>
            <input v-model="topic" type="text" class="ec-input rounded-l-lg">
            <button
                class="bg-purple-700 px-4 py-2 text-white font-bold rounded-r-lg"
                @click="similaritySearch"
            >
                Search
            </button>
        </div>
    </div>
  </template>
  
<script setup lang="ts">
    import { ref } from "vue";
    import axios from "axios";

    const topic = ref("");

    async function similaritySearch() {  
        const response = await axios.post('/api/similarity-search', {
            topic: topic.value
        });
        console.log(response.data);
    }
</script>
  
<style scoped></style>
  