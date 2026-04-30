import type { DownloadNavItemDto } from '../dtos/DownloadNavItemDto'
import { AnchorNavItemModel } from './AnchorNavItemModel'
import type { NavItemAnchorAttrs } from './NavItemModel'

export class DownloadNavItemModel extends AnchorNavItemModel {
  readonly #filename: string | null

  constructor({ id, icon, url, filename }: DownloadNavItemDto) {
    super({ id, icon, url })
    this.#filename = filename ?? null
  }

  protected override expectedScheme(): readonly string[] {
    return ['http:', 'https:', 'blob:', 'data:']
  }

  override toAnchorAttrs(): NavItemAnchorAttrs {
    return {
      ...super.toAnchorAttrs(),
      download: this.#filename ?? '',
    }
  }
}
