import { describe, expect, it } from 'vitest'
import type { NavItemDto } from '../../dtos/NavItemDto'
import type { NavItemAnchorAttrs, NavItemClickDeps } from '../../models/NavItemModel'
import { NavItemModel } from '../../models/NavItemModel'

describe('NavItemModel', () => {
  class TestNavItemModel extends NavItemModel {
    constructor(dto: NavItemDto) {
      super(dto)
    }

    static parseForTest(input: string | URL): URL {
      return TestNavItemModel.parseUrl(input)
    }

    override toAnchorAttrs(): NavItemAnchorAttrs {
      return {}
    }

    override onClick(_event: MouseEvent, _deps: NavItemClickDeps): void {
      // no-op
    }
  }

  it('constructs a model with id and icon', () => {
    const model = new TestNavItemModel({ id: 'nav-person', icon: 'person' })

    expect(model.id).toBe('nav-person')
    expect(model.icon).toBe('person')
  })

  it('has readonly getters', () => {
    const model = new TestNavItemModel({ id: 'nav-person', icon: 'person' })

    expect(() => {
      // @ts-expect-error — assignment to getter-only property
      model.id = 'other'
    }).toThrow()
    expect(() => {
      // @ts-expect-error — assignment to getter-only property
      model.icon = 'email'
    }).toThrow()
  })

  it('normalizes string input to URL through protected parseUrl', () => {
    const parsed = TestNavItemModel.parseForTest('https://soyaaroncervantes.com')

    expect(parsed).toBeInstanceOf(URL)
    expect(parsed.href).toBe('https://soyaaroncervantes.com/')
  })

  it('returns the same URL instance for URL inputs', () => {
    const url = new URL('https://soyaaroncervantes.com')

    const parsed = TestNavItemModel.parseForTest(url)

    expect(parsed).toBe(url)
  })

  it('throws for invalid URL strings', () => {
    expect(() => TestNavItemModel.parseForTest('invalid-url')).toThrow('Invalid URL')
  })
})
