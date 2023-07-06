<template>
    <div>
        <Tabs v-model="activeTab" />
        <div class="flex justify-center p-4">
            <div class="container w-5/12 border rounded-lg text-center p-4 mt-8 bg-white dark:bg-gray-800">
                <FileUpload v-if="activeTab === 'fileUpload'" />
                <UrlCrawl v-if="activeTab === 'urlCrawl'" />
                <GithubRepo v-if="activeTab === 'githubRepoLoader'" />
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
    import { ref } from "vue";
    import FileUpload from "../components/FileUpload.vue";
    import UrlCrawl from "../components/UrlCrawl.vue";
    import GithubRepo from "../components/GithubRepo.vue";
    import Tabs from "../components/Tabs.vue";

    const activeTab = ref("fileUpload");
</script>
