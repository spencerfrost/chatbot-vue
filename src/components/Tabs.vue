<template>
    <div class="flex">
        <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="setActiveTab(tab.id)"
            :aria-selected="currentTab === tab.id"
            role="tab"
            class="rounded-full text-white bg-opacity-20 px-4 py-2 transition-all ease-in-out"
            :class="{
                'bg-white': currentTab === tab.id,
                'bg-gray-500': currentTab !== tab.id,
            }"
        >
            {{ tab.name }}
        </button>
    </div>
</template>
  
<script setup lang="ts">
    import { ref } from "vue";
    
    const props = defineProps({
        modelValue: String,
    });

    const emit = defineEmits(["update:modelValue"]);
    
    const tabs = [
        { id: "fileUpload", name: "File Upload" },
        { id: "urlCrawl", name: "URL Crawl" },
        { id: "githubRepoLoader", name: "Github Repo Loader" },
    ];
    
    let currentTab = ref(props.modelValue);
    
    const setActiveTab = (tabId) => {
        currentTab.value = tabId;
        emit('update:modelValue', currentTab.value);
    };
</script>
  