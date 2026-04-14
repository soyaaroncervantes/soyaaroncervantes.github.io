import { M3eTheme } from '@m3e/react/theme'
import type { PropsWithChildren } from 'react'
import { useEffect, useEffectEvent } from 'react'
import { type ThemeType, useThemeStore } from '@/features/theme/theme.stores'

type Props = PropsWithChildren & {}

export const ThemeProvider = ({ children }: Props) => {
  const { theme, setTheme } = useThemeStore()

  const onColorSchemeChange = useEffectEvent((e: MediaQueryListEvent) => {
    const newTheme: ThemeType = e.matches ? 'dark' : 'light'
    setTheme(newTheme)
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    mediaQuery.addEventListener('change', onColorSchemeChange)
    return () => mediaQuery.removeEventListener('change', onColorSchemeChange)
  }, [])

  return (
    <M3eTheme scheme={theme} color="#a8e6cf" motion="expressive">
      {children}
    </M3eTheme>
  )
}
