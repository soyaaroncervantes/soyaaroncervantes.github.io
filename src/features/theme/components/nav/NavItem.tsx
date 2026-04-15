import { M3eNavItem } from '@m3e/react/nav-bar'
import type { ComponentProps, PropsWithChildren } from 'react'
import { useEffect, useRef } from 'react'
import { useNavItemHandlers } from './Nav'

type Props = PropsWithChildren & ComponentProps<typeof M3eNavItem> & {}
export const NavItem = ({ children, onChange, selected, ...props }: Props) => {
  const { onChangeHandler, onSelected, useNavItemRef } = useNavItemHandlers()
  const handlersRef = useRef({ onChangeHandler, onSelected, useNavItemRef })
  const m3eNavItemRef = useNavItemRef()

  useEffect(() => {
    if (!selected || !m3eNavItemRef.current) return
    handlersRef.current.onSelected(m3eNavItemRef.current)
  }, [selected, m3eNavItemRef])

  return (
    <M3eNavItem
      {...props}
      selected={selected}
      ref={m3eNavItemRef}
      onChange={(e) => handlersRef.current.onChangeHandler(e, onChange)}
    >
      {children}
    </M3eNavItem>
  )
}
