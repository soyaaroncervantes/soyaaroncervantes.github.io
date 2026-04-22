import { M3eTheme } from '@m3e/react/theme'
import type { PropsWithChildren } from 'react'
import { useThemeController } from '@/features/theme/hooks/useThemeController'

type Props = PropsWithChildren & {}

export const ThemeProvider = ({ children }: Props) => {
  const { theme } = useThemeController()
  const { scheme, color } = theme

  return (
    <M3eTheme scheme={scheme} color={color} motion="expressive">
      {children}
    </M3eTheme>
  )
}
