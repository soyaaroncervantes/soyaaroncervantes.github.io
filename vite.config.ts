import { paraglideVitePlugin } from '@inlang/paraglide-js'
import { defineConfig } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { generateIconNames } from 'vite-plugin-svg-sprite-names-typescript'

export default defineConfig({
  base: '/',
  server: {
    port: Number(process.env.VITE_APP_PORT) || 5173,
  },
  plugins: [generateIconNames({
    svgFilePath: './public/icons.svg',
    typesFilePath: './src/features/theme/components/icon/icon-names.generated.ts',
    typeName: 'SpriteIconId',
  }),
    paraglideVitePlugin({ project: './project.inlang', outdir: './src/paraglide' }),
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