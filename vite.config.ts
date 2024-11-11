import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/data_visualize_01/', // 替换成你的GitHub仓库名
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
