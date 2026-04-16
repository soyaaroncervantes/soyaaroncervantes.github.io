import type { ComponentPropsWithoutRef } from 'react'
import layouts from './layout.module.css'

type ContentLayoutProps = ComponentPropsWithoutRef<'main'>

export function ContentLayout({ children, className, ...props }: ContentLayoutProps) {
  return (
    <main className={[layouts.content, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </main>
  )
}
