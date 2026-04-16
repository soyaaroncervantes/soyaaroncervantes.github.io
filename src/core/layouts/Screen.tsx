import type { ComponentPropsWithoutRef } from 'react'
import layouts from './layout.module.css'

type ScreenLayoutProps = ComponentPropsWithoutRef<'div'>

export function ScreenLayout({ children, className, ...props }: ScreenLayoutProps) {
  return (
    <div className={[layouts.screen, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  )
}
