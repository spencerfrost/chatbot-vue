<template>
    <div class="border rounded-lg p-4 mb-4 bg-white dark:bg-gray-800">
        <h3 class="text-lg font-bold mb-2 text-gray-700 dark:text-gray-300">File Upload</h3>
        <div class="flex items-center mb-4">
            <input id="fileInput" type="file" @change="onFileChange($event)" class="mr-2" />
        </div>
        <button
            @click="uploadFile"
            class="bg-blue-500 text-white px-4 py-2 rounded"
            :disabled="!file"
        >
            Upload
        </button>
    </div>
    <div class="border rounded-lg p-4 bg-white dark:bg-gray-800">
        <h3 class="text-lg font-bold mb-2 text-gray-700 dark:text-gray-300">URL Crawl</h3>
        <div class="flex items-center mb-4">
            <input id="urlInput" type="text" v-model="url" placeholder="Enter URL" class="mr-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded" />
            <input id="targetInput" type="text" v-model="targetElement" placeholder="Target element" class="mr-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded" />

            <div class="flex items-center">
                <input id="parseLinksCheckbox" type="checkbox" v-model="parseLinks" class="mr-2" />
                <label for="parseLinksCheckbox" class="text-gray-700 dark:text-gray-300">Parse Links</label>
            </div>            
            <input id="linkSelectorInput" type="text" v-model="linkSelector" placeholder="querySelector target for links" class="mr-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded" />
        </div>
        <button
            @click="crawlUrl"
            class="bg-blue-500 text-white px-4 py-2 rounded"
            :disabled="!url"
        >
            Crawl
        </button>
    </div>
    <div class="border rounded-lg p-4 bg-white dark:bg-gray-800">
        <h3 class="text-lg font-bold mb-2 text-gray-700 dark:text-gray-300">Github Repo Loader</h3>
        <div class="flex items-center mb-4">
            <input id="repoInput" type="text" v-model="repo" placeholder="Repo" class="mr-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded" />
        </div>
        <button
            @click="loadGithubRepo()"
            class="bg-blue-500 text-white px-4 py-2 rounded"
            :disabled="!repo"
        >
            Load
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
    const repo = ref("");
    

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

    async function loadGithubRepo() {
        if (!repo.value) {
            console.error("No repo entered.");
            return;
        }

        const formData = new FormData();
        formData.append("repo", repo.value);

        try {
            await axios.post("/api/github", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        } catch (error) {
            console.error(error);
        }
    }
</script>