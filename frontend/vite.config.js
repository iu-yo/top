// vite.config.js
import { defineConfig } from 'vite'; // ✅ 正确导入
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
// 