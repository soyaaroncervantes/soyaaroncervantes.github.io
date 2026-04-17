import type { HTMLAttributes, PropsWithChildren } from 'react'
import styles from './nav.module.css'

type Props = PropsWithChildren & HTMLAttributes<HTMLDivElement>

export const NavContainer = ({ children, className, ...props }: Props) => {
  return (
    <div {...props} className={[styles.container, className].filter(Boolean).join(' ')}>
      {children}
    </div>
  )
}
