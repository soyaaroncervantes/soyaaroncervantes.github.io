import type { ComponentPropsWithoutRef } from 'react'
import layouts from './layout.module.css'

type BaseLayoutProps = ComponentPropsWithoutRef<'div'>

export function BaseLayout({ children, className, ...props }: BaseLayoutProps) {
  return (
    <div className={[layouts.base, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  )
}
