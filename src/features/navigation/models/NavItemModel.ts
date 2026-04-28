import type { NavItemDto, NavRoute } from '../dtos/NavItemDto'

export class NavItemModel {
  readonly #id: string
  readonly #icon: string
  readonly #to: NavRoute

  constructor({ id, icon, to }: NavItemDto) {
    this.#id = id
    this.#icon = icon
    this.#to = to
  }

  get id(): string {
    return this.#id
  }

  get icon(): string {
    return this.#icon
  }

  get to(): NavRoute {
    return this.#to
  }
}
