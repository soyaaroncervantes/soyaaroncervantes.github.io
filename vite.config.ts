import { defineConfig } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig({
  base: '/',
  server: {
    port: Number(process.env.VITE_APP_PORT) || 5173,
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