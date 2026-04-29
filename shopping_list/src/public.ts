import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PublicApp from './PublicApp.vue'

const app = createApp(PublicApp)
app.use(createPinia())
app.mount('#shopping_list_public')
