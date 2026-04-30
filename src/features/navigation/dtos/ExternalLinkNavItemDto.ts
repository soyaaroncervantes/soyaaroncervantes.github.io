import type { LinkTarget } from '@m3e/web/core'
import type { NavItemDto } from './NavItemDto'

export type ExternalLinkNavItemDto = NavItemDto & {
  url: string | URL
  target?: LinkTarget
  rel?: string
}
