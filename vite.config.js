import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      "@ast": fileURLToPath(new URL('./src/assets', import.meta.url)),
      "@cmp": fileURLToPath(new URL('./src/components', import.meta.url)),
    }
  },
  server: {
    port: 9000
  }
})
