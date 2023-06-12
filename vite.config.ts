import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: { port: 8080 }

  // resolve: {
  //   alias: [
  //     {
  //       find: 'vue-i18n',
  //       replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
  //     }
  //   ]
  // }
})
