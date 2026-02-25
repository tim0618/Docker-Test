import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 👇 加入這段 server 設定 👇
  server: {
    port: 3000,       // 固定使用 3000 port
    strictPort: true  // 如果 3000 剛好被別的程式佔用，就直接報錯，不要自動亂換 port
  }
})