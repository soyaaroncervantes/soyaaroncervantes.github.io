import type { LinkButtonMixin } from '@m3e/web/core'
import type { NavigateFn } from '@tanstack/react-router'
import type { NavItemDto } from '../dtos/NavItemDto'

export type NavItemAnchorAttrs = Partial<
  Pick<LinkButtonMixin, 'href' | 'target' | 'rel' | 'download'>
>

export type NavItemClickDeps = {
  navigate: NavigateFn
  onActivate?: (model: NavItemModel) => void
}

export abstract class NavItemModel {
  readonly #id: string
  readonly #icon: string

  protected constructor({ id, icon }: NavItemDto) {
    this.#id = id
    this.#icon = icon
  }

  get id(): string {
    return this.#id
  }

  get icon(): string {
    return this.#icon
  }

  protected static parseUrl(input: string | URL): URL {
    const parsed = input instanceof URL ? input : URL.parse(input)
    if (!parsed) {
      throw new Error(`Invalid URL: ${String(input)}`)
    }
    return parsed
  }

  abstract toAnchorAttrs(): NavItemAnchorAttrs
  abstract onClick(event: MouseEvent, deps: NavItemClickDeps): void
}
