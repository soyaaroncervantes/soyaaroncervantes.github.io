import { M3eIconButton } from '@m3e/react/icon-button'
import type { ComponentProps, PropsWithChildren } from 'react'

export type ThemeButtonIconProps = PropsWithChildren & ComponentProps<typeof M3eIconButton> & {}

export const ThemeButtonIcon = ({ children, ...props }: ThemeButtonIconProps) => {
  return <M3eIconButton {...props}>{children}</M3eIconButton>
}
