import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import './style.css'
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

createApp(App).use(router).mount('#app')