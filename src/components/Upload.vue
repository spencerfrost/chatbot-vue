<template>
    <div class="border rounded-lg p-4 mb-4">
        <h3 class="text-lg font-bold mb-2">File Upload</h3>
        <div class="flex items-center mb-4">
            <input id="fileInput" type="file" @change="onFileChange($event)" class="mr-2" />
            <!-- <input id="namespaceInput" type="text" v-model="namespace" placeholder="Enter namespace" class="mr-2 px-4 py-2 border border-gray-300 rounded" /> -->
        </div>
        <button
            @click="uploadFile"
            class="bg-blue-500 text-white px-4 py-2 rounded"
            :disabled="!file"
        >
            Upload
        </button>
    </div>
    <div class="border rounded-lg p-4">
        <h3 class="text-lg font-bold mb-2">URL Crawl</h3>
        <div class="flex items-center mb-4">
            <input id="urlInput" type="text" v-model="url" placeholder="Enter URL" class="mr-2 px-4 py-2 border border-gray-300 rounded" />
            <input id="targetInput" type="text" v-model="targetElement" placeholder="Target element" class="mr-2 px-4 py-2 border border-gray-300 rounded" />

            <div class="flex items-center">
                <input id="parseLinksCheckbox" type="checkbox" v-model="parseLinks" class="mr-2" />
                <label for="parseLinksCheckbox">Parse Links</label>
            </div>            
            <input id="linkSelectorInput" type="text" v-model="linkSelector" placeholder="Enter namespace" class="mr-2 px-4 py-2 border border-gray-300 rounded" />
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

    const file = ref(null);
    const url = ref("");
    const parseLinks = ref(false);
    const targetElement = ref("");
    const linkSelector = ref("");

    function onFileChange(event) {
        file.value = event.target.files[0];
    }

    async function uploadFile() {
        if (!file.value) {
            console.error("No file selected.");
            return;
        }
        const formData = new FormData();
        formData.append("file", file.value);

        try {
            await axios.post("/api/ingest", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        } catch (error) {
            console.error(error);
        }
    }

    async function crawlUrl() {
        if (!url.value) {
            console.error("No URL entered.");
            return;
        }

        const formData = new FormData();
        formData.append("url", url.value);
        formData.append("parseLinks", parseLinks.value.toString());
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