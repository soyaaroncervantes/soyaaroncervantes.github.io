import type { PropsWithChildren } from 'react'
import { Nav } from '@/features/theme/components/nav/Nav'

type Props = PropsWithChildren & {
  className?: string
  containerClassName?: string
  color?: string
}

export const NavbarLayout = ({ children, className, containerClassName, color }: Props) => {
  return (
    <Nav.Rail className={className} color={color}>
      <Nav.Container className={containerClassName}>{children}</Nav.Container>
    </Nav.Rail>
  )
}
