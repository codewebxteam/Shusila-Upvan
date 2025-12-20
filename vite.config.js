// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // load env variables (optional, but useful later)
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],

    // development server
    server: {
      port: 5173,
      open: true,                       // auto-open browser
      cors: true,                       // allow any origin (for dev)
      proxy: {
        // proxy every /api request to the backend
        '/api': {
          target: env.VITE_API_URL || 'https://your-backend-api.com',
          changeOrigin: true,           // sets host header to backend
          secure: true,                 // set to false if backend uses self-signed cert
          rewrite: path => path         // keep path as-is
        }
      }
    },

    // build settings
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development', // generate source maps only in dev
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            ui: ['lucide-react', 'framer-motion']
          }
        }
      }
    },

    // path resolution shortcuts (optional)
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@pages': '/src/pages',
        '@assets': '/src/assets'
      }
    }
  }
})