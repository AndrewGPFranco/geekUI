import './main.css'
import { marked } from 'marked'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')

marked.setOptions({
  breaks: true,
  gfm: true,
})
