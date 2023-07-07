import { createRouter, createWebHistory } from 'vue-router'
import Chat from './views/Chat.vue'
import DocumentLoaders from './views/DocumentLoaders.vue'
import Debug from './views/Debug.vue'
// import Store from './components/Store.vue'

const routes = [
  { path: '/chat', component: Chat },
  { path: '/loaders', component: DocumentLoaders },
  { path: '/debug', component: Debug },
  // { path: '/store', component: Store },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;
