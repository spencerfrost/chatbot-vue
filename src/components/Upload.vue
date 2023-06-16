<template>
    <div>
        <div class="relative right-0">
            <ul class="relative flex list-none flex-wrap rounded-lg bg-blue-gray-50/60 p-1" role="list">
                <li class="z-30 flex-auto text-center">
                <button
                    class="text-slate-700 z-30 mb-0 flex w-full cursor-pointer items-center justify-center rounded-lg border-0 bg-inherit px-0 py-1 transition-all ease-in-out"
                    @click="activeTab = 'fileUpload'"
                    :aria-selected="activeTab === 'fileUpload'"
                    role="tab"
                >
                    <span class="ml-1">File Upload</span>
                </button>
                </li>
                <li class="z-30 flex-auto text-center">
                <button
                    class="text-slate-700 z-30 mb-0 flex w-full cursor-pointer items-center justify-center rounded-lg border-0 bg-inherit px-0 py-1 transition-all ease-in-out"
                    @click="activeTab = 'urlCrawl'"
                    :aria-selected="activeTab === 'urlCrawl'"
                    role="tab"
                >
                    <span class="ml-1">URL Crawl</span>
                </button>
                </li>
                <li class="z-30 flex-auto text-center">
                <button
                    class="text-slate-700 z-30 mb-0 flex w-full cursor-pointer items-center justify-center rounded-lg border-0 bg-inherit px-0 py-1 transition-all ease-in-out"
                    @click="activeTab = 'githubRepoLoader'"
                    :aria-selected="activeTab === 'githubRepoLoader'"
                    role="tab"
                >
                    <span class="ml-1">Github Repo Loader</span>
                </button>
                </li>
            </ul>
        </div>
        <div v-if="activeTab === 'fileUpload'" class="border rounded-lg p-4 mb-4 bg-white dark:bg-gray-800">
            <h3 class="text-lg font-bold mb-2 text-gray-700 dark:text-gray-300">File Upload</h3>
            <div class="flex items-center mb-4">
                <input id="fileInput" type="file" @change="onFileChange($event)" class="mr-2" />
                <input id="namespaceInput" type="text" v-model="namespace" placeholder="Namespace" class="mr-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded" />
            </div>
            <button
                @click="uploadFile"
                class="bg-blue-500 text-white px-4 py-2 rounded"
                :disabled="!file"
            >
                Upload
            </button>
        </div>
        <div v-if="activeTab === 'urlCrawl'" class="border rounded-lg p-4 bg-white dark:bg-gray-800">
            <h3 class="text-lg font-bold mb-2 text-gray-700 dark:text-gray-300">URL Crawl</h3>
            <div class="flex items-center mb-4">
                <input id="urlInput" type="text" v-model="url" placeholder="Enter URL" class="mr-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded" />
                <input id="targetInput" type="text" v-model="targetElement" placeholder="Target element" class="mr-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded" />
                <input id="namespaceInput" type="text" v-model="namespace" placeholder="Namespace" class="mr-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded" />
        
                <!-- <div class="flex items-center">
                    <input id="parseLinksCheckbox" type="checkbox" v-model="parseLinks" class="mr-2" />
                    <label for="parseLinksCheckbox" class="text-gray-700 dark:text-gray-300">Parse Links</label>
                </div>   
                <input id="linkSelectorInput" type="text" v-model="linkSelector" placeholder="querySelector target for links" class="mr-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded" /> -->
            </div>
            <button
                @click="crawlUrl"
                class="bg-blue-500 text-white px-4 py-2 rounded"
                :disabled="!url"
            >
                Crawl
            </button>
        </div>
        <div v-if="activeTab === 'githubRepoLoader'" class="border rounded-lg p-4 bg-white dark:bg-gray-800">
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
    </div>
</template>
  
<script setup lang="ts">
    import { ref } from "vue";
    import axios from "axios";

    const activeTab = ref("fileUpload");

    const file = ref(null);
    const url = ref("");
    const targetElement = ref("");
    const repo = ref("");
    const namespace = ref("");
    // const parseLinks = ref(false);
    // const linkSelector = ref("");

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

<style>
    input[type=file] {
        width: 350px;
        max-width: 100%;
        background: #fff;
        border-radius: 0.25rem;
        border: 1px solid #555;
    }
    input[type=file]::file-selector-button {
        margin-right: 20px;
        border: none;
        background: #ededed;
        padding: 8px 20px;
        color: #fff;
        cursor: pointer;
        transition: background .2s ease-in-out;
    }

    input[type=file]::file-selector-button:hover {
        background: #0d45a5;
    }
</style>