import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

// Not sure why Typescript is complaining about this import... Need to investigate.
import App from './App.vue'
import Chat from './components/Chat.vue'
import Upload from './components/Upload.vue'
// import Store from './components/Store.vue'

import './style.css'

const routes = [
  { path: '/chat', component: Chat },
  { path: '/upload', component: Upload },
  // { path: '/store', component: Store },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
