import type { ColorScheme as ThemeType } from '@m3e/react/theme'
import { createSlice } from 'zustand-slices'
import { useStore } from '@/core/stores/app.store'

export type ThemeSliceInitProps = { theme: ThemeType }

export const createThemeSlice = (init?: ThemeSliceInitProps) =>
  createSlice({
    name: 'theme',
    value: (init?.theme ?? 'auto') as ThemeType,
    actions: {
      setTheme: (theme: ThemeType) => () => theme,
    },
  })

export type ThemeSlice = {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
}

export const useThemeStore = () =>
  useStore((state) => ({
    theme: state.theme,
    setTheme: state.setTheme,
  }))

export type { ThemeType }
