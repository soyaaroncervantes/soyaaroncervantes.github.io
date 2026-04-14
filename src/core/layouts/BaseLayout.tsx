import type { ComponentPropsWithoutRef } from 'react'
import themeStyles from '@/features/theme/theme.module.css'

type BaseLayoutProps = ComponentPropsWithoutRef<'div'>

export function BaseLayout({ children, className, ...props }: BaseLayoutProps) {
  return (
    <div className={[themeStyles.base, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  )
}
