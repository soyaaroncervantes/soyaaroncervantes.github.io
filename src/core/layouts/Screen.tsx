import type { ComponentPropsWithoutRef } from 'react'
import themeStyles from '@/features/theme/theme.module.css'

type ScreenLayoutProps = ComponentPropsWithoutRef<'div'>

export function ScreenLayout({ children, className, ...props }: ScreenLayoutProps) {
  return (
    <div className={[themeStyles.base, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  )
}
