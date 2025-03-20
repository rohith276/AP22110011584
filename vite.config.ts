import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  define: {
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      ACCESS_TOKEN: JSON.stringify(process.env.ACCESS_TOKEN),
    }, // Define process.env for the browser
  },
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/test': {
        target: 'http://20.244.56.144',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
