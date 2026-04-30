import path from 'node:path'
import { paraglideVitePlugin } from '@inlang/paraglide-js'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  server: {
    port: Number(process.env.VITE_APP_PORT) || 5173,
  },
  plugins: [
    paraglideVitePlugin({ project: './project.inlang', outdir: './src/paraglide' }),
    tanstackRouter({
      target: 'react',
      routesDirectory: './src/core/routes',
      autoCodeSplitting: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
