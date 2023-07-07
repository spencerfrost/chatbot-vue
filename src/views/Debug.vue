<template>
    <div class="flex justify-center p-4">
        <div class="container w-5/12 border rounded-lg text-center p-4 mt-8 bg-white dark:bg-gray-800">
            <h2>Similarity Search</h2>
            <div class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong class="font-bold">Incomplete feature</strong>
                <span class="block sm:inline">This feature is still in development. It will only output in the console.</span>
            </div>
            <input v-model="topic" type="text" class="ec-input">
            <button
                class="bg-purple-500 dark:bg-purple-700 px-4 py-2 text-white font-bold rounded-r-lg"
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
  