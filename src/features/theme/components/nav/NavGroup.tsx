import { M3eNavMenuItemGroup } from '@m3e/react/nav-menu'
import type { ComponentProps, PropsWithChildren } from 'react'
import styles from './nav.module.css'

type Props = PropsWithChildren & ComponentProps<typeof M3eNavMenuItemGroup>

export const NavGroup = ({ children, className, ...props }: Props) => {
  return (
    <M3eNavMenuItemGroup {...props} className={[styles.group, className].filter(Boolean).join(' ')}>
      {children}
    </M3eNavMenuItemGroup>
  )
}
