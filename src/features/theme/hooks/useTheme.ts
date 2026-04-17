import { useEffect, useEffectEvent } from 'react'
import { type ThemeType, useThemeStore } from '../theme.stores'

export const useTheme = () => {
  const { theme, setScheme, setColor } = useThemeStore()

  const onColorSchemeChange = useEffectEvent((e: MediaQueryListEvent) => {
    const newTheme: ThemeType = e.matches ? 'dark' : 'light'
    setScheme(newTheme)
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    mediaQuery.addEventListener('change', onColorSchemeChange)
    return () => mediaQuery.removeEventListener('change', onColorSchemeChange)
  }, [])

  return { theme, setScheme, setColor }
}
