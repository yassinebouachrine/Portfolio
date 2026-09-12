import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  server: {
    port: 5173,
    watch: {
      usePolling: true,
      interval: 300
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist'
  }
})