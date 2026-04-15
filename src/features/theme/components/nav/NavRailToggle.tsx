import { M3eNavRailToggle } from '@m3e/react/nav-rail'
import type { ComponentProps, PropsWithChildren } from 'react'

type Props = PropsWithChildren &
  ComponentProps<typeof M3eNavRailToggle> & {
    id: string
  }
export const NavRailToggle = ({ children, id, ...props }: Props) => {
  return <M3eNavRailToggle {...props}>{children}</M3eNavRailToggle>
}
