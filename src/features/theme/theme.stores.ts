import type { ColorScheme as ThemeType } from '@m3e/react/theme'
import { createSlice } from 'zustand-slices'
import { useStore } from '@/core/stores/app.store'

export type ThemeSliceInitProps = {
  scheme: ThemeType
  color: string
}

export const createThemeSlice = (init?: ThemeSliceInitProps) =>
  createSlice({
    name: 'theme',
    value: {
      scheme: init?.scheme ?? 'auto',
      color: init?.color ?? '#0b467e',
    },
    actions: {
      setScheme: (scheme: ThemeType) => (prev) => ({ ...prev, scheme }),
      setColor: (color: string) => (prev) => ({ ...prev, color }),
    },
  })

export type ThemeSlice = {
  theme: ThemeType
  color: string
  setScheme: (scheme: ThemeType) => void
  setColor: (color: string) => void
}

export const useThemeStore = () =>
  useStore(({ theme, setScheme, setColor }) => ({
    theme,
    setScheme,
    setColor,
  }))

export type { ThemeType }
