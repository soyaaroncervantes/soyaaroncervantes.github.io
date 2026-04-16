import type { M3eNavItemElement } from '@m3e/react/nav-bar'
import type { PropsWithChildren } from 'react'
import { createContext, use, useCallback, useState } from 'react'
import type { Nullable } from '@/shared/base.types'
import { NavItem } from './NavItem'
import { NavRail } from './NavRail'
import { NavRailToggle } from './NavRailToggle'

export type NavContextType = {
  isOpen?: boolean
  id?: string
  item?: Nullable<M3eNavItemElement>
}

type NavContextInternalType = NavContextType & {
  onSelected: (element: M3eNavItemElement) => void
}

const NavContext = createContext<Nullable<NavContextInternalType>>(null)

type Props = PropsWithChildren & {
  id?: string
  isOpen?: boolean
}

export const Nav = ({ children, id, isOpen }: Props) => {
  const [item, setNavItem] = useState<Nullable<M3eNavItemElement>>(null)

  const onSelected = useCallback((element: M3eNavItemElement) => {
    setNavItem(element)
  }, [])

  return (
    <NavContext.Provider value={{ isOpen, id, item, onSelected }}>{children}</NavContext.Provider>
  )
}

export const useNav = (): NavContextInternalType => {
  const context = use(NavContext)
  if (!context) {
    throw new Error('useNav must be used within a Nav component')
  }
  return context
}

Nav.Rail = NavRail
Nav.Item = NavItem
Nav.Toggle = NavRailToggle
