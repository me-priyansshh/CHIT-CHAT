import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'  // your plugin

export default defineConfig({
  plugins: [
    react(),    // React plugin must come first
    tailwind(), // Tailwind plugin
  ],
  build: {
    outDir: 'dist', // production folder
  },
})
