import { M3eHeading } from '@m3e/react/heading'
import type { ComponentProps, PropsWithChildren } from 'react'

export type ThemeCardHeaderProps = PropsWithChildren & ComponentProps<typeof M3eHeading> & {}

export const ThemeCardHeader = ({ children, ...props }: ThemeCardHeaderProps) => {
  return <M3eHeading {...props}>{children}</M3eHeading>
}
