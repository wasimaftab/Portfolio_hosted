import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  server: {
    open: true,
  },
  base: '/Portfolio_hosted/', // Set the base path
  build: {
    outDir: '../dist',
    emptyOutDir: true, // Clear the output directory before each build
    sourcemap: false, // Disable source maps
  },
  publicDir: '../public', 
})
