import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/madhukar-portfolio", // Move this out of optimizeDeps
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
