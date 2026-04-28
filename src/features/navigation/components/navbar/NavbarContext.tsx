import { createContext, use } from 'react'
import type { Nullable } from '@/shared/base.types'
import type { NavItemModel } from '../../models/NavItemModel'

export type NavbarContextType = {
  navigation: Array<[groupId: string, itemsSet: Nullable<Set<NavItemModel>>]>
  activeItem: NavItemModel | null
}

export const NavbarContext = createContext<Nullable<NavbarContextType>>(null)

export const useNavbarContext = (): NavbarContextType => {
  const context = use(NavbarContext)
  if (!context) {
    throw new Error('useNavbarContext must be used within a Navbar component')
  }
  return context
}
