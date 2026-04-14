import { M3eButton } from '@m3e/react/button'
import type { ComponentProps, PropsWithChildren } from 'react'

export type ThemeButtonProps = PropsWithChildren & ComponentProps<typeof M3eButton> & {}

export const ThemeButton = ({ children, ...props }: ThemeButtonProps) => {
  return <M3eButton {...props}>{children}</M3eButton>
}
