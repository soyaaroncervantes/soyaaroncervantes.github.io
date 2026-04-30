import type { NavItemDto } from '../dtos/NavItemDto'
import { type NavItemAnchorAttrs, type NavItemClickDeps, NavItemModel } from './NavItemModel'

type AnchorConstructorArgs = NavItemDto & { url: string | URL }

export abstract class AnchorNavItemModel extends NavItemModel {
  readonly #href: URL

  protected constructor({ id, icon, url }: AnchorConstructorArgs) {
    super({ id, icon })
    this.#href = this.#parseAndValidate(url)
  }

  protected get href(): URL {
    return this.#href
  }

  protected abstract expectedScheme(): string | readonly string[]

  #parseAndValidate(input: string | URL): URL {
    const parsed = NavItemModel.parseUrl(input)
    const expected = this.expectedScheme()
    const allowed = Array.isArray(expected) ? expected : [expected]

    if (!allowed.includes(parsed.protocol)) {
      throw new Error(`Scheme ${parsed.protocol} not allowed; expected ${allowed.join(', ')}`)
    }

    return parsed
  }

  override toAnchorAttrs(): NavItemAnchorAttrs {
    return { href: this.#href.toString() }
  }

  override onClick(_event: MouseEvent, { onActivate }: NavItemClickDeps): void {
    onActivate?.(this)
  }
}
