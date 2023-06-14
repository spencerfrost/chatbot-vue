<template>
  <div>
    <div class="bg-white p-4 rounded-lg shadow-lg overflow-y-scroll h-[calc(100vh-154px)]">
      <template v-for="(item, i) in chatMessages">
        <!-- User chat bubbles -->
        <div
          v-if="item.type === 'user'"
          :key="`item-${i}`"
          class="flex items-end mb-2 justify-end"
        >
          <div
            class="bg-purple-500 text-white p-2 rounded-tr-lg rounded-br-lg rounded-bl-lg w-max inline-block"
          >
            {{ item.content }}
          </div>
          <img
            class="w-8 h-8 rounded-full ml-2"
            src="../assets/pfp.png"
            alt="profile picture"
          />
        </div>

        <!-- AI Chat bubbles -->
        <div
          v-else
          :key="`item-else-${i}`"
          class="flex items-end mb-2"
        >
          <img
            class="w-8 h-8 rounded-full mr-2"
            src="../assets/denim_dan.png"
            alt="AI profile picture"
          />
          <div
            class="bg-blue-500 text-white p-2 rounded-tl-lg rounded-bl-lg rounded-br-lg w-max inline-block"
          >
            <div v-html="item.content"></div>
          </div>
        </div>
      </template>
    </div>

    <!-- User Input -->
    <div class="w-full pt-4">
      <div class="flex items-center bg-white rounded-lg shadow-lg">
        <input
          type="text"
          class="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none"
          placeholder="Ask a question..."
          v-model="newMessage"
          @keypress.enter="sendMessage"
        />
        <button
          @click="sendMessage"
          class="bg-purple-500 px-4 py-2 text-white font-bold rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import * as marked from "marked";

const newMessage = ref("");

const chatMessages = ref<{ type: string; content: string }[]>([]);

const messageHistory: string[] = [];

async function sendMessage() {
  const message = {
    type: "user",
    content: newMessage.value,
  };

  newMessage.value = "";
  chatMessages.value.push(message);

  const { data } = await axios.post('/api/chat', {
    message: message.content,
    history: messageHistory,
  });

  
  messageHistory.push(message.content, data.text)
  chatMessages.value.push({
    type: "ai",
    content: marked.marked(data.text),
  });
}
</script>

<style scoped></style>
