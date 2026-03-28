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
        target: 'http://localhost:5202', 
        changeOrigin: true,
        secure: false,
      },
      '/images': {
        target: 'http://localhost:5202',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})