import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  // Configuración para producción
  build: {
    // Optimizaciones de build
    minify: 'esbuild',
    sourcemap: false,
    
    // Configuración de rollup para optimización
    rollupOptions: {
      output: {
        // Separar chunks para mejor caching
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
        // Nombres de archivos optimizados
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(css)$/.test(assetInfo.name)) {
            return `assets/css/[name]-[hash].${ext}`;
          }
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        },
      },
    },
    
    // Límites de tamaño
    chunkSizeWarningLimit: 1000,
    
    // Target para mejor compatibilidad
    target: 'es2015',
  },
  
  // Configuración de preview (para testing local)
  preview: {
    port: 4173,
    host: true,
  },
  
  // Configuración del servidor de desarrollo
  server: {
    port: 5173,
    host: true,
  },
})
