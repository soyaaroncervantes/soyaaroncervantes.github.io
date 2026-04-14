import type { HTMLAttributes, PropsWithChildren } from 'react'

export type ThemeCardContentProps = PropsWithChildren & HTMLAttributes<HTMLDivElement>

export const ThemeCardContent = ({ children, ...props }: ThemeCardContentProps) => {
  return (
    <div {...props} slot="content">
      {children}
    </div>
  )
}
