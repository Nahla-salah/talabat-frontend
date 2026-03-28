import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/Api': {
        target: 'https://localhost:7122',
        changeOrigin: true,
        secure: false,
      },
      '/images': {
        target: 'https://localhost:7122',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})