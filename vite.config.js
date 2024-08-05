import { defineConfig } from 'vite';
import { resolve } from 'path'; // Add this import

export default defineConfig({
  root: 'src',
  server: {
    open: true,
  },
  // base: '/Portfolio_hosted/', // Set the base path
  build: {
    outDir: '../dist',
    emptyOutDir: true, // Clear the output directory before each build
    sourcemap: false, // Disable source maps
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        resume: resolve(__dirname, 'src/resume.html'),
        projects: resolve(__dirname, 'src/projects.html'),
        contact: resolve(__dirname, 'src/contact.html'),
      }
    }
  },
  publicDir: '../public',
});
