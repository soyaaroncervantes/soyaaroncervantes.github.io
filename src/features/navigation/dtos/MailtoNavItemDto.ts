import type { NavItemDto } from './NavItemDto'

export type MailtoNavItemDto = NavItemDto & {
  email: string
  subject?: string
  body?: string
}
