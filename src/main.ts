import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin, defaultConfig } from '@formkit/vue'

import config from './formkit.config'
import App from './App.vue'

import './index.css'

const app = createApp(App)

app.use(createPinia())
app.use(plugin, defaultConfig(config))

app.mount('#vue-app')

console.log('vue app mounted')
