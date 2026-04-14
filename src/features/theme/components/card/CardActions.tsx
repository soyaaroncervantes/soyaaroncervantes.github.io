import type { HTMLAttributes, PropsWithChildren } from 'react'

export type ThemeCardActionsProps = PropsWithChildren & HTMLAttributes<HTMLDivElement>

export const ThemeCardActions = ({ children, ...props }: ThemeCardActionsProps) => {
  return (
    <div {...props} slot="actions">
      {children}
    </div>
  )
}
