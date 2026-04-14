import { M3eHeading } from '@m3e/react/heading'
import type { ComponentProps, PropsWithChildren } from 'react'

export type ThemeTextProps = PropsWithChildren & ComponentProps<typeof M3eHeading> & {}

export const ThemeText = ({ children, ...props }: ThemeTextProps) => {
  return <M3eHeading {...props}>{children}</M3eHeading>
}
