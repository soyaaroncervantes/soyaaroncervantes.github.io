import { M3eButton } from '@m3e/react/button'
import type { ComponentProps, PropsWithChildren } from 'react'
import { ThemeButtonGroup } from './ButtonGroup'
import { ThemeButtonIcon } from './ButtonIcon'
import { ThemeButtonSplit } from './ButtonSplit'

export type ThemeButtonProps = PropsWithChildren & ComponentProps<typeof M3eButton> & {}

const ThemeButton = ({ children, ...props }: ThemeButtonProps) => {
  return <M3eButton {...props}>{children}</M3eButton>
}

export const Button = ThemeButton as typeof ThemeButton & {
  Icon: typeof ThemeButtonIcon
  Group: typeof ThemeButtonGroup
  Split: typeof ThemeButtonSplit
}

Button.Icon = ThemeButtonIcon
Button.Group = ThemeButtonGroup
Button.Split = ThemeButtonSplit
