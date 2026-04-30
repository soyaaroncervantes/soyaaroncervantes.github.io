import type { NavRoute } from '../dtos/NavItemDto'
import type { RouteNavItemDto } from '../dtos/RouteNavItemDto'
import { type NavItemAnchorAttrs, type NavItemClickDeps, NavItemModel } from './NavItemModel'

export class RouteNavItemModel extends NavItemModel {
  readonly #to: NavRoute

  constructor({ id, icon, to }: RouteNavItemDto) {
    super({ id, icon })
    this.#to = to
  }

  get to(): NavRoute {
    return this.#to
  }

  override toAnchorAttrs(): NavItemAnchorAttrs {
    return { href: this.#to }
  }

  override onClick(event: MouseEvent, { navigate, onActivate }: NavItemClickDeps): void {
    event.preventDefault()
    onActivate?.(this)
    navigate({ to: this.#to })
  }
}
