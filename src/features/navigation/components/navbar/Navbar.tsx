import type { ThemeNavProps } from '@/features/theme/components/nav/Nav'
import { Nav } from '@/features/theme/components/nav/Nav'
import { useNavbarController } from '../../hooks/useNavbarController'
import type { NavbarMap } from '../../types'
import { NavbarContext, type NavbarContextType } from './NavbarContext'
import { NavbarItems } from './NavbarItems'
import { NavbarLayout } from './NavbarLayout'

export type NavbarProps = ThemeNavProps & {
  navigation: NavbarMap
}

export const Navbar = ({ children, id, isOpen, navigation }: NavbarProps) => {
  // 1. Llama al controller para obtener navigationEntries y activeItem
  const { navigationEntries, activeItem } = useNavbarController(navigation)

  // 2. Crea el contexto de Navbar
  const navbarContextValue: NavbarContextType = {
    navigation: navigationEntries, // Ya transformado por el controller
    activeItem,
  }

  // 3. Wrappea Nav (que tiene su propio contexto)
  // Reutiliza ThemeNavProps: id, isOpen
  return (
    <Nav id={id} isOpen={isOpen}>
      <NavbarContext.Provider value={navbarContextValue}>{children}</NavbarContext.Provider>
    </Nav>
  )
}

// 4. Registra sub-componentes
Navbar.Layout = NavbarLayout
Navbar.Items = NavbarItems
