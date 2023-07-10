<template>
    <div>
        <h3 class="text-lg font-bold mb-2 text-gray-300">File Upload</h3>
        <div class="flex justify-center mb-8">
            <form action="#" class="relative w-4/5 h-32 max-w-xs mb-10 rounded-lg shadow-inner bg-gray-600 bg-opacity-20 rounded border border-gray-600">
                <input type="file" id="file-upload" class="hidden" @change="onFileChange($event)">
                <label for="file-upload" class="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer px-6 ">
                    <p class="z-10 text-xs font-light text-center text-gray-500">Drag & Drop your files here</p>
                    <svg class="z-10 w-8 h-8 text-indigo-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                    </svg>
                </label>
            </form>
        </div>
        <button
            @click="uploadFile"
            class="bg-blue-500 text-white px-4 py-2 rounded"
            :disabled="!file"
        >
            Upload
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const file = ref(null);

function onFileChange(event: { target: { files: null[]; }; }) {
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
</script>
