import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import vueDevTools from 'vite-plugin-vue-devtools'


export default defineConfig({
    plugins: [
        vue(),
        vuetify({autoImport: true}),
        vueDevTools()
    ],
})
