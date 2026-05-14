import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PublicApp from './PublicApp.vue'
import { offlinePersistPlugin } from './offline/piniaPlugin'

const pinia = createPinia()
pinia.use(offlinePersistPlugin)

const app = createApp(PublicApp)
app.use(pinia)
app.mount('#shopping_list_public')
