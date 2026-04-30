import type { Nullable } from '@/shared/base.types'
import type { NavItemModel } from './models/NavItemModel'

/**
 * Mapa de navegación que define grupos de items.
 *
 * - Key: ID único del grupo (string)
 * - Value:
 *   - null: Spacer/separator (renderiza Nav.Item disabled)
 *   - Set<NavItemModel>: Grupo con items (renderiza Nav.Group con Nav.Items)
 *
 * @example
 * ```ts
 * const navigation: NavbarMap = new Map([
 *   ['spacer-top', null],
 *   ['main', new Set([
 *     new RouteNavItemModel({ id: 'nav-person', icon: 'person', to: '/v1/' }),
 *   ])],
 * ])
 * ```
 */
export type NavbarMap = Map<string, Nullable<Set<NavItemModel>>>
