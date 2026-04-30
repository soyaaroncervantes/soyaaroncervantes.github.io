import type { NavItemDto } from './NavItemDto'

export type DownloadNavItemDto = NavItemDto & {
  url: string | URL
  filename?: string
}
