import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/medi-connect/', // ✅ Esto asegura que funcione en esa subruta
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // ✅ Alias opcional para importar componentes
    },
  },
});
