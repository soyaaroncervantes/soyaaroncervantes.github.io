import { describe, expect, it, vi } from 'vitest'
import { AnchorNavItemModel } from '../../models/AnchorNavItemModel'
import type { NavItemClickDeps } from '../../models/NavItemModel'

class TestAnchorModel extends AnchorNavItemModel {
  constructor(url: string | URL) {
    super({ id: 'test-anchor', icon: 'home', url })
  }

  protected override expectedScheme(): string {
    return 'https:'
  }
}

describe('AnchorNavItemModel', () => {
  it('stores href for valid scheme', () => {
    const model = new TestAnchorModel('https://soyaaroncervantes.com')

    expect(model.toAnchorAttrs()).toEqual({ href: 'https://soyaaroncervantes.com/' })
  })

  it('rejects invalid URL strings', () => {
    expect(() => new TestAnchorModel('not-a-url')).toThrow('Invalid URL')
  })

  it('rejects non-expected schemes', () => {
    expect(() => new TestAnchorModel('http://soyaaroncervantes.com')).toThrow(
      'Scheme http: not allowed'
    )
  })

  it('accepts URL instances', () => {
    const url = new URL('https://soyaaroncervantes.com')
    const model = new TestAnchorModel(url)

    expect(model.toAnchorAttrs()).toEqual({ href: url.toString() })
  })

  it('fires onActivate and does not prevent default by default', () => {
    const model = new TestAnchorModel('https://soyaaroncervantes.com')
    const event = new MouseEvent('click')
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault')
    const onActivate = vi.fn()
    const deps = { navigate: vi.fn(), onActivate } as NavItemClickDeps

    model.onClick(event, deps)

    expect(onActivate).toHaveBeenCalledWith(model)
    expect(preventDefaultSpy).not.toHaveBeenCalled()
  })
})
