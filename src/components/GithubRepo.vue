<template>
    <div>
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong class="font-bold">Work in Progress!!</strong>
            <span class="block sm:inline">This feature is still in development. It is not yet ready for use.</span>
        </div>

        <h3 class="text-lg font-bold mb-2 text-gray-300">Github Repo Loader</h3>
        <div class="flex flex-col align-items-center justify-content-center mb-4">
            <input
                type="text"
                v-model="url"
                placeholder="Repo"
                class="ec-input"
            />
        </div>
        <button
            @click="loadGithubRepo()"
            class="bg-blue-500 text-white px-4 py-2 rounded"
            :disabled="!url"
        >
            Load
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const url = ref("");

async function loadGithubRepo() {
    if (!url.value) {
        console.error("No repo entered.");
        return;
    }

    const formData = new FormData();
    formData.append("url", url.value);

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
