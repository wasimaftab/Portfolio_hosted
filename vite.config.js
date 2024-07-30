import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  server: {
    open: true,
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true, // Clear the output directory before each build
    sourcemap: false, // Disable source maps
  },
  publicDir: '../public', 
})
