<template>
    <div>
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong class="font-bold">Work in Progress!!</strong>
            <span class="block sm:inline">This feature is still in development. It is not yet ready for use.</span>
        </div>
        
        <h3 class="text-lg font-bold mb-2 text-gray-300">URL Crawl</h3>
        <div class="flex flex-col align-items-center justify-content-center mb-8">
            <input id="urlInput" type="text" v-model="url" placeholder="Enter URL" class="ec-input my-2" />
            <input id="targetInput" type="text" v-model="targetElement" placeholder="Target element" class="ec-input my-2" />
            <input id="linkSelectorInput" type="text" v-model="linkSelector" placeholder="Link element" class="ec-input my-2" />
        </div>
        <button
            @click="crawlUrl"
            class="bg-blue-500 text-white px-4 py-2 rounded"
            :disabled="!url"
        >
            Crawl
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const url = ref("");
const targetElement = ref("");
const linkSelector = ref("");

async function crawlUrl() {
    if (!url.value) {
        console.error("No URL entered.");
        return;
    }

    const formData = new FormData();
    
    formData.append("url", url.value);
    formData.append("targetElement", targetElement.value);
    formData.append("linkSelector", linkSelector.value);

    try {
        await axios.post("/api/crawl", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    } catch (error) {
        console.error(error);
    }
}
</script>
