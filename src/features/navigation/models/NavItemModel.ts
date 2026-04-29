import type { Nullable } from '@/shared/base.types'
import type { NavItemDto, NavRoute } from '../dtos/NavItemDto'

export class NavItemModel {
  readonly #id: string
  readonly #icon: string
  readonly #to: Nullable<NavRoute>
  readonly #url: Nullable<URL>

  constructor({ id, icon, to, url }: NavItemDto) {
    this.#id = id
    this.#icon = icon
    this.#to = to ?? null
    this.#url = url ?? null
  }

  get id(): string {
    return this.#id
  }

  get icon(): string {
    return this.#icon
  }

  get to(): Nullable<NavRoute> {
    return this.#to
  }

  get url(): Nullable<URL> {
    return this.#url
  }

  canUseExternalIcon(): boolean {
    return !!this.#url;
  }
}
