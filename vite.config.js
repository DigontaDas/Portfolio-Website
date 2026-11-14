import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('react-globe.gl') || id.includes('three-globe') || id.includes('d3-')) {
            return 'globe-vendor';
          }
          if (id.includes('@react-three') || id.includes('/three/') || id.includes('\\three\\')) {
            return 'three-vendor';
          }
          if (id.includes('framer-motion') || id.includes('lenis')) {
            return 'motion-vendor';
          }
          if (id.includes('react-dom') || id.includes('/react/') || id.includes('\\react\\')) {
            return 'react-vendor';
          }
        },
      },
    },
  },
})
