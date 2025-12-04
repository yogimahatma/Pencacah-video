import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, '.', '');
  
  return {
    plugins: [react()],
    define: {
      // Memastikan process.env.API_KEY tersedia di kode klien
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY || env.API_KEY || process.env.API_KEY || '')
    },
    server: {
      port: 3000,
      host: true, // PENTING: Mengizinkan akses dari IP Network (LAN/WiFi)
      open: true  // Membuka browser otomatis saat dijalankan
    },
    build: {
      outDir: 'dist',
      sourcemap: false
    }
  };
});