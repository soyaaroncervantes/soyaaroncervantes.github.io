import type { NavItemDto } from './NavItemDto'

export type ShareNavItemDto = NavItemDto & {
  url: string | URL
  title?: string
  text?: string
}
