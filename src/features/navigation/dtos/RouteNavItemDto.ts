import type { NavItemDto, NavRoute } from './NavItemDto'

export type RouteNavItemDto = NavItemDto & {
  to: NavRoute
}
