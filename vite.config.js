import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: '8080'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/assets/styles', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `
				@import './node_modules/bootstrap/scss/functions'
				@import './src/assets/styles/bootstrap/custom-vars'
				@import './node_modules/bootstrap/scss/variables'
				@import './node_modules/bootstrap/scss/maps'
				@import './node_modules/bootstrap/scss/mixins'
				@import './node_modules/bootstrap/scss/utilities'
				@import './src/assets/styles/bootstrap/custom-utils'
				`
      }
    }
  }
})
