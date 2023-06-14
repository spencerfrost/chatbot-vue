<template>
    <div class="border rounded-lg p-4 mb-4">
        <h3 class="text-lg font-bold mb-2">File Upload</h3>
        <div class="flex items-center mb-4">
            <input id="fileInput" type="file" @change="onFileChange($event)" class="mr-2" />
            <input id="namespaceInput" type="text" v-model="namespace" placeholder="Enter namespace" class="mr-2 px-4 py-2 border border-gray-300 rounded" />
        </div>
        <button
            @click="uploadFile"
            class="bg-blue-500 text-white px-4 py-2 rounded"
            :disabled="!file || !namespace"
        >
            Upload
        </button>
    </div>
    <div class="border rounded-lg p-4">
        <h3 class="text-lg font-bold mb-2">URL Crawl</h3>
        <div class="flex items-center mb-4">
            <input id="urlInput" type="text" v-model="url" placeholder="Enter URL" class="mr-2 px-4 py-2 border border-gray-300 rounded" />
            <input id="crawlNamespaceInput" type="text" v-model="crawlNamespace" placeholder="Enter namespace" class="mr-2 px-4 py-2 border border-gray-300 rounded" />
        </div>
        <button
            @click="crawlUrl"
            class="bg-blue-500 text-white px-4 py-2 rounded"
            :disabled="!url || !crawlNamespace"
        >
            Crawl
        </button>
    </div>
</template>
  
<script setup lang="ts">
    import { ref } from "vue";
    import axios from "axios";

    const file = ref(null);
    const namespace = ref("");
    const url = ref("");
    const crawlNamespace = ref("");

    function onFileChange(event) {
        file.value = event.target.files[0];
    }

    async function uploadFile() {
        if (!file.value || !namespace.value) {
            console.error("No file selected or namespace entered.");
            return;
        }
        const formData = new FormData();
        formData.append("file", file.value);
        formData.append("namespace", namespace.value);

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
        if (!url.value || !crawlNamespace.value) {
            console.error("No URL entered or namespace entered.");
            return;
        }

        try {
            await axios.post("/api/crawl", {
            url: url.value,
            namespace: crawlNamespace.value,
            });
        } catch (error) {
            console.error(error);
        }
    }
</script>