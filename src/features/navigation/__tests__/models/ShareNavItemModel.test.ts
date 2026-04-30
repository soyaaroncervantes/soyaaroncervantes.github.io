import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ShareNavItemModel } from '../../models/ShareNavItemModel'

describe('ShareNavItemModel', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('uses Web Share API when available and canShare succeeds', async () => {
    const share = vi.fn().mockResolvedValue(undefined)
    const canShare = vi.fn().mockReturnValue(true)
    Object.defineProperty(globalThis, 'navigator', {
      value: { share, canShare, clipboard: { writeText: vi.fn() } },
      configurable: true,
    })
    const model = new ShareNavItemModel({
      id: 'share',
      icon: 'share',
      url: 'https://soyaaroncervantes.com',
      title: 'Portfolio',
      text: 'Check out my portfolio',
    })

    model.onClick(new MouseEvent('click'), { navigate: vi.fn(), onActivate: vi.fn() })
    await Promise.resolve()

    expect(canShare).toHaveBeenCalled()
    expect(share).toHaveBeenCalledWith({
      url: 'https://soyaaroncervantes.com/',
      title: 'Portfolio',
      text: 'Check out my portfolio',
    })
  })

  it('falls back to clipboard when Web Share API is unavailable', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(globalThis, 'navigator', {
      value: { clipboard: { writeText } },
      configurable: true,
    })
    const model = new ShareNavItemModel({
      id: 'share',
      icon: 'share',
      url: 'https://soyaaroncervantes.com',
    })

    model.onClick(new MouseEvent('click'), { navigate: vi.fn(), onActivate: vi.fn() })
    await Promise.resolve()

    expect(writeText).toHaveBeenCalledWith('https://soyaaroncervantes.com/')
  })

  it('does not fallback to clipboard when user aborts share flow', async () => {
    const share = vi.fn().mockRejectedValue(new DOMException('Aborted', 'AbortError'))
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(globalThis, 'navigator', {
      value: { share, canShare: vi.fn().mockReturnValue(true), clipboard: { writeText } },
      configurable: true,
    })
    const model = new ShareNavItemModel({
      id: 'share',
      icon: 'share',
      url: 'https://soyaaroncervantes.com',
    })

    model.onClick(new MouseEvent('click'), { navigate: vi.fn(), onActivate: vi.fn() })
    await Promise.resolve()

    expect(writeText).not.toHaveBeenCalled()
  })

  it('returns empty anchor attrs because share action is programmatic', () => {
    const model = new ShareNavItemModel({
      id: 'share',
      icon: 'share',
      url: 'https://soyaaroncervantes.com',
    })

    expect(model.toAnchorAttrs()).toEqual({})
  })

  it('throws for invalid share URL strings', () => {
    expect(
      () =>
        new ShareNavItemModel({
          id: 'share',
          icon: 'share',
          url: 'invalid-url',
        })
    ).toThrow('Invalid URL')
  })
})
