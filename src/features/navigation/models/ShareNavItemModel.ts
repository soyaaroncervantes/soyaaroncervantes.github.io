import type { ShareNavItemDto } from '../dtos/ShareNavItemDto'
import { type NavItemAnchorAttrs, type NavItemClickDeps, NavItemModel } from './NavItemModel'

export class ShareNavItemModel extends NavItemModel {
  readonly #title: string | null
  readonly #text: string | null
  readonly #url: URL

  constructor({ id, icon, url, title, text }: ShareNavItemDto) {
    super({ id, icon })
    this.#title = title ?? null
    this.#text = text ?? null
    this.#url = NavItemModel.parseUrl(url)
  }

  override toAnchorAttrs(): NavItemAnchorAttrs {
    return {}
  }

  override onClick(_event: MouseEvent, { onActivate }: NavItemClickDeps): void {
    onActivate?.(this)
    void this.#share({
      url: this.#url.href,
      title: this.#title ?? undefined,
      text: this.#text ?? undefined,
    })
  }

  async #share(data: ShareData): Promise<void> {
    const webShareUnavailable =
      typeof navigator === 'undefined' ||
      typeof navigator.share !== 'function' ||
      (navigator.canShare !== undefined && !navigator.canShare(data))

    if (webShareUnavailable) {
      await this.#copyUrlSilently(data.url ?? '')
      return
    }

    try {
      await navigator.share(data)
    } catch (err) {
      if ((err as DOMException)?.name === 'AbortError') {
        return
      }
      await this.#copyUrlSilently(data.url ?? '')
    }
  }

  async #copyUrlSilently(url: string): Promise<void> {
    await navigator.clipboard?.writeText(url).catch(() => {
      // silent degradation
    })
  }
}
