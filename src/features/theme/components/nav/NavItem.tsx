import { M3eNavItem, type M3eNavItemElement } from '@m3e/react/nav-bar'
import type { ComponentProps, PropsWithChildren } from 'react'
import { useCallback, useEffect, useRef } from 'react'
import { useNav } from './Nav'

type Props = PropsWithChildren & ComponentProps<typeof M3eNavItem> & {}
export const NavItem = ({ children, onChange, selected, ...props }: Props) => {
  const { onSelected, item } = useNav()
  const handlersRef = useRef({ onSelected, item })
  const m3eNavItemRef = useRef<M3eNavItemElement>(null)
  const initializedRef = useRef(selected)

  const onChangeHandler = useCallback(() => {
    if (!m3eNavItemRef.current) return
    handlersRef.current.onSelected(m3eNavItemRef.current)
  }, [])

  useEffect(() => {
    if (!initializedRef.current || !m3eNavItemRef.current) return
    handlersRef.current.onSelected(m3eNavItemRef.current)
  }, [])

  const isSelected = item === m3eNavItemRef.current

  return (
    <M3eNavItem
      {...props}
      selected={isSelected}
      ref={m3eNavItemRef}
      onChange={onChangeHandler}
    >
      {children}
    </M3eNavItem>
  )
}
