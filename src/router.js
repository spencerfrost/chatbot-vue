import { createRouter, createWebHistory } from 'vue-router'
import Chat from './components/Chat.vue'
import Upload from './components/Upload.vue'
// import Store from './components/Store.vue'

const routes = [
  { path: '/chat', component: Chat },
  { path: '/upload', component: Upload },
  // { path: '/store', component: Store },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;
