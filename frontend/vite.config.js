import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
/*
-change http://localhost:5000 to backend url when deploying to production as seperate frontend and backend. However if frontend will be built and connected to backend, then leave as it it. 
- '/api' is a good pre-term for API routes, so other non API routes can be set directly. eg "example.com/shop" etc
*/