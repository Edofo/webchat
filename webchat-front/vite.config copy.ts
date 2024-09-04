import 'vitest/config'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    svgr({
      include: '**/*.svg?react'
    }),
    react()
  ],
  resolve: {
    alias: {
      '@app': '/src'
    }
  },
  css: {
    preprocessorOptions: {}
  },
  server: {
    host: '127.0.0.1',
    port: 5173
  },
  test: {
    setupFiles: ['./vitest.setup.ts'],
    environment: 'jsdom'
  }
})
