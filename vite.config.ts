import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Memuat env file berdasarkan mode (development/production)
  const env = loadEnv(mode, '.', '');
  
  return {
    plugins: [react()],
    define: {
      // Polyfill process.env.API_KEY agar bisa dibaca di browser client-side
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY || env.API_KEY || '')
    },
    server: {
      port: 3000
    }
  };
});