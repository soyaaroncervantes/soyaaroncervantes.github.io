import type { HTMLAttributes, PropsWithChildren } from 'react'

export type ThemeButtonGroupProps = PropsWithChildren & HTMLAttributes<HTMLDivElement> & {}

export const ThemeButtonGroup = ({ children, ...props }: ThemeButtonGroupProps) => {
  return (
    <div {...props} is="m3e-button-group">
      {children}
    </div>
  )
}
