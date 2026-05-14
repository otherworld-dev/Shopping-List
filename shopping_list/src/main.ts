import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { offlinePersistPlugin } from './offline/piniaPlugin'

const pinia = createPinia()
pinia.use(offlinePersistPlugin)

const app = createApp(App)
app.use(pinia)
app.mount('#shopping_list')
