import type { HTMLAttributes, PropsWithChildren } from 'react'

export type ThemeCardFooterProps = PropsWithChildren & HTMLAttributes<HTMLDivElement>

export const ThemeCardFooter = ({ children, ...props }: ThemeCardFooterProps) => {
  return (
    <div {...props} slot="footer">
      {children}
    </div>
  )
}
