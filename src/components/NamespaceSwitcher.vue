<template>
    <select
        id="namespace"
        v-model="namespace"
        class="ec-input mt-3"
        @change="updateNamespace($event)"
    >
        <!-- v-for namespaces for the options-->

        
    </select>

</template>

<script setup lang="ts">
    import { ref } from "vue";
    import axios from "axios";

    const namespace = ref("default");
    const namespaces = ref([]);

    fetchNamespaces();

    async function fetchNamespaces() {
        // Try to use the `server/indexStats.js` file to fetch the namespaces. I haven't been able to get it to work
        // despite `index.describeIndexStats()` being a valid function in the Pinecone package. 
        // If that doesn't work, maybe there's another way? But it seems to be the only way to get the namespaces.

        // Relevant Pinecone docs: https://docs.pinecone.io/docs/langchain
        // Relevant Langchain docs: https://js.langchain.com/docs/modules/indexes/vector_stores/integrations/pinecone

        try {
            const response = await axios.get('/api/index-stats');
            namespaces.value = response.data;
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function updateNamespace({ target: { value }}) {
        // For this, you'll have to set up a new endpoint in the `server/` directory and add it to the routes.js file.
        // The endpoint should take the namespace as a parameter and then set it as the current namespace in 
        // the Pinecone client/index and wherever else it needs to be set. (Just do a global search for "namespace")
        // I'm not 100% sure about the implementation of this so see what you can come up with and we can discuss it.
    }

</script>
