import type { ThemeType } from './theme.stores'

export const getPreferredColorScheme = (): ThemeType =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
