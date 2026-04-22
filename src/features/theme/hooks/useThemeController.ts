import { useEffect, useEffectEvent } from 'react'
import { type ThemeType, useThemeStore } from '../theme.stores'

export const useThemeController = () => {
  const { theme, setScheme, setColor } = useThemeStore()

  const onColorSchemeChange = useEffectEvent((e: MediaQueryListEvent) => {
    const newTheme: ThemeType = e.matches ? 'dark' : 'light'
    const color = newTheme === 'dark' ? '#1565a8' : '#aaceff'
    setScheme(newTheme)
    setColor(color)
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    mediaQuery.addEventListener('change', onColorSchemeChange)
    return () => mediaQuery.removeEventListener('change', onColorSchemeChange)
  }, [])

  return { theme, setScheme, setColor }
}
