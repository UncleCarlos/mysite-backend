import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    include: ['dayjs/locale/zh-cn', 'dayjs/plugin/relativeTime', '@icon-park/vue-next/es/all'],
  },
})
