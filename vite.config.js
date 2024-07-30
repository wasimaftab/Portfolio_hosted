import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  server: {
    open: true,
  },
  base: '/Portfolio_hosted/', // Set the base path
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: false,
  },
  publicDir: '../public',
})
