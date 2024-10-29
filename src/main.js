import {createApp} from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
// Vuetify
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App)
const pinia = createPinia()

const vuetify = createVuetify({
    components,
    directives,
})
app.use(pinia)
app.use(vuetify)
app.mount('#app')
