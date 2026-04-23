import { M3eSplitButton } from '@m3e/react/split-button'
import type { ComponentProps, PropsWithChildren } from 'react'

export type ThemeButtonSplitProps = PropsWithChildren & ComponentProps<typeof M3eSplitButton> & {}

export const ThemeButtonSplit = ({ children, ...props }: ThemeButtonSplitProps) => {
  return <M3eSplitButton {...props}>{children}</M3eSplitButton>
}
