import type { HTMLAttributes, PropsWithChildren } from 'react'

export type ThemeCardHeaderProps = PropsWithChildren & HTMLAttributes<HTMLDivElement> & {}

export const ThemeCardHeader = ({ children, ...props }: ThemeCardHeaderProps) => {
  return (
    <div {...props} slot="header">
      {children}
    </div>
  )
}
