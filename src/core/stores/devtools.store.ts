import type { devtools } from 'zustand/middleware'
import { optionalDevtools } from 'zustand-utils'

const isDev = import.meta.env.DEV

export const createDevtools =
  (name: string): typeof devtools =>
  (initializer) =>
    optionalDevtools(isDev)(initializer, {
      name: `Store ${name}${isDev ? ' (DEV)' : ''}`,
    })
