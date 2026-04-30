import type { ExternalLinkNavItemDto } from '../dtos/ExternalLinkNavItemDto'
import { AnchorNavItemModel } from './AnchorNavItemModel'
import type { NavItemAnchorAttrs } from './NavItemModel'

export class ExternalLinkNavItemModel extends AnchorNavItemModel {
  readonly #target: string
  readonly #rel: string

  constructor({ id, icon, url, target, rel }: ExternalLinkNavItemDto) {
    super({ id, icon, url })
    this.#target = target ?? '_blank'
    this.#rel = rel ?? 'noopener noreferrer'
  }

  protected override expectedScheme(): readonly string[] {
    return ['http:', 'https:']
  }

  override toAnchorAttrs(): NavItemAnchorAttrs {
    return {
      ...super.toAnchorAttrs(),
      target: this.#target,
      rel: this.#rel,
    }
  }
}
