import { Fragment, type ReactNode } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useNavbarContext } from './NavbarContext'
import { Nav } from '@/features/theme/components/nav/Nav'

type NavbarItemsProps = {
  overrides?: Map<string, ReactNode>
}

export const NavbarItems = ({ overrides }: NavbarItemsProps = {}) => {
  const { navigation, activeItem } = useNavbarContext()
  const navigate = useNavigate()

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
            return null  // No renderizar nada si el override es falsy
          }
          
          // Renderizar el override wrapeado en Fragment con key único
          return (
            <Fragment key={`group-${groupId}`}>
              {overrideElement}
            </Fragment>
          )
        }

        // Caso 2: Spacer (itemsSet es null)
        if (itemsSet === null) {
          return (
            <Nav.Item
              key={`group-${groupId}`}
              slot={`group-${groupId}`}
              disabled
            />
          )
        }

        // Caso 3: Grupo con items (default rendering)
        // Validar que el Set no esté vacío
        if (itemsSet.size === 0) {
          return null  // No renderizar grupo vacío
        }

        return (
          <Nav.Group
            key={`group-${groupId}`}
            slot={`group-${groupId}`}
          >
            {Array.from(itemsSet).map((model) => (
              <Nav.Item
                key={`item-${model.id}`}
                slot={`item-${model.id}`}
                icon={model.icon}
                selected={model === activeItem}
                onClick={() => navigate({ to: model.to })}
              />
            ))}
          </Nav.Group>
        )
      })}
    </>
  )
}
