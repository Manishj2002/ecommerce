import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5000",   // ← Express backend
        changeOrigin: true,               // ← ADD THIS LINE (important!)
        secure: false,                    // ← ADD THIS LINE too
      },
    },
  },
})