import { M3eNavRail } from '@m3e/react/nav-rail'
import type { ComponentProps, PropsWithChildren } from 'react'
import { useNav } from './Nav'
import styles from './nav.module.css'

type Props = PropsWithChildren & ComponentProps<typeof M3eNavRail> & {}
export const NavRail = ({ children, className, ...props }: Props) => {
  const { id } = useNav()
  return (
    <M3eNavRail
      {...props}
      id={id}
      className={[styles.nav, styles.rail, className].filter(Boolean).join(' ')}
    >
      {children}
    </M3eNavRail>
  )
}
