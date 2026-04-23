import { M3eIconButton } from '@m3e/react/icon-button'
import type { ComponentProps, PropsWithChildren } from 'react'

export type ThemeIconButtonProps = PropsWithChildren & ComponentProps<typeof M3eIconButton> & {}

export const ThemeIconButton = ({ children, ...props }: ThemeIconButtonProps) => {
  return <M3eIconButton {...props}>{children}</M3eIconButton>
}
