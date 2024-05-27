import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  // 别名设置
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
