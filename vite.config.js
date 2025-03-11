import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
/*
export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true, // Fixes refresh issue on React Router
  },
}); */

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:4000', // Connects frontend to backend
    },
  },
});