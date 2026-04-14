import { M3eIcon } from '@m3e/react/icon'
import type { ComponentProps, PropsWithChildren } from 'react'

export type ThemeIconProps = PropsWithChildren & ComponentProps<typeof M3eIcon> & {}

export const ThemeIcon = ({ children, ...props }: ThemeIconProps) => {
  return <M3eIcon {...props}>{children}</M3eIcon>
}
