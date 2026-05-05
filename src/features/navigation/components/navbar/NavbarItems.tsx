import { useNavigate } from '@tanstack/react-router'
import { Fragment, type ReactNode } from 'react'
import { Theme } from '@/features/theme/components'
import { Nav } from '@/features/theme/components/nav/Nav'
import type { NavItemProps } from '@/features/theme/components/nav/NavItem'
import type { NavItemModel } from '../../models/NavItemModel'
import { useNavbarContext } from './NavbarContext'

type NavbarItemsProps = {
  overrides?: Map<string, ReactNode>
}

type ItemProps = NavItemProps & {
  model: NavItemModel
}
const Item = ({ model, selected, ...props }: ItemProps) => {
  const navigate = useNavigate()
  const { onActivate } = useNavbarContext()

  return (
    <Nav.Item
      selected={selected}
      {...props}
      onClick={(event) => model.onClick(event as MouseEvent, { navigate, onActivate })}
      {...model.toAnchorAttrs()}
    >
      <Theme.Icon name={model.icon} aria-label={model.id} />
    </Nav.Item>
  )
}

export const NavbarItems = ({ overrides }: NavbarItemsProps = {}) => {
  const { navigation, activeItem } = useNavbarContext()

  // Guard: Si navigation está vacío, no renderizar nada
  if (!navigation || navigation.length === 0) {
    return null
  }

  return (
    <>
      {navigation.map(([groupId, itemsSet]) => {
        // Caso 1: Si existe un override para este groupId
        if (overrides?.has(groupId)) {
          const overrideElement = overrides.get(groupId)

          // Validar que el override no sea falsy (null, undefined, false, etc.)
          if (!overrideElement) {
            return null // No renderizar nada si el override es falsy
          }

          // Renderizar el override wrapeado en Fragment con key único
          return <Fragment key={`group-${groupId}`}>{overrideElement}</Fragment>
        }

        // Caso 2: Spacer (itemsSet es null)
        if (itemsSet === null) {
          return <Nav.Item key={`group-${groupId}`} disabled />
        }

        // Caso 3: Grupo con items (default rendering)
        // Validar que el Set no esté vacío
        if (itemsSet.size === 0) {
          return null // No renderizar grupo vacío
        }

        return (
          <Nav.Group key={`group-${groupId}`}>
            {Array.from(itemsSet).map((model) => (
              <Item key={`item-${model.id}`} model={model} selected={model === activeItem} />
            ))}
          </Nav.Group>
        )
      })}
    </>
  )
}
