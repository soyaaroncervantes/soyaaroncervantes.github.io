import { M3eNavRail } from '@m3e/react/nav-rail'
import type { ComponentProps, PropsWithChildren } from 'react'
import { useNav } from './Nav'
import styles from './nav.module.css'

type Props = PropsWithChildren & ComponentProps<typeof M3eNavRail> & {
  color?: string
}
export const NavRail = ({ children, className, color, ...props }: Props) => {
  const { id } = useNav()
  return (
    <M3eNavRail
      {...props}
      color={color}
      id={id}
      className={[styles.base, styles.rail, className].filter(Boolean).join(' ')}
    >
      {children}
    </M3eNavRail>
  )
}
