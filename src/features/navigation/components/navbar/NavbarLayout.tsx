import type { PropsWithChildren } from 'react'
import { Nav } from '@/features/theme/components/nav/Nav'

type Props = PropsWithChildren & {
  className?: string
  color?: string
}

export const NavbarLayout = ({ children, className, color }: Props) => {
  return (
    <Nav.Rail className={className} color={color}>
      <Nav.Container>{children}</Nav.Container>
    </Nav.Rail>
  )
}
