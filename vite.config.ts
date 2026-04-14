import path from 'node:path';
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig({
  base: '/react-template/',
  server: {
    port: 5173,
  },
  plugins: [
    tanstackRouter({
      target: 'react',
      routesDirectory: './src/core/routes',
      autoCodeSplitting: true,
    }),
    react()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})