import { M3eNavRail } from '@m3e/react/nav-rail'
import type { ComponentProps, PropsWithChildren } from 'react'
import { useNav } from './Nav'

type Props = PropsWithChildren & ComponentProps<typeof M3eNavRail> & {}
export const NavRail = ({ children, ...props }: Props) => {
  const { id } = useNav()
  return (
    <M3eNavRail {...props} id={id}>
      {children}
    </M3eNavRail>
  )
}
