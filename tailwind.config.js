import { defineConfig } from '@tailwindcss/vite'

export default defineConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        'restaurant': {
          'earth': '#8B4513',        // Saddle Brown - madera oscura
          'wood': '#CD853F',         // Peru - madera media
          'light-wood': '#DEB887',   // Burlywood - madera clara
          'beige': '#FFF8DC',        // Cornsilk - fondo muy suave
          'cream': '#F5F5DC',        // Beige - fondo cálido
          'olive': '#6B8E23',        // Olive Drab - verde oliva
          'gold': '#FFD700',         // Gold - dorado brillante
          'bronze': '#CD7F32',       // Bronze - bronce
          'accent': '#DC143C',       // Crimson - rojo acento
          'text': '#2F1B14',         // Marrón muy oscuro para texto
          'text-light': '#8B4513',   // Marrón medio para texto secundario
        }
      }
    },
  },
})
