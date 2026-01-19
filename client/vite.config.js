import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',   // Keep build inside frontend folder
  },
  server: {
    port: 5173,
  },
  base: '/'           // ensures correct routing for React Router
})
