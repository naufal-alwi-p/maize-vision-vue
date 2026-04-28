import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from "@primeuix/themes/aura"
import Ripple from 'primevue/ripple'

import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(router)

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            cssLayer: {
                name: 'primevue',
                order: 'theme, base, primevue',
            },
            darkModeSelector: false || 'none',
        },
    },
})

app.directive('ripple', Ripple)

app.mount('#app')
