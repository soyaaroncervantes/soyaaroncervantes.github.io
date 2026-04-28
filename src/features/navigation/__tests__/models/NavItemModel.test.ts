import { describe, it, expect } from 'vitest'
import { NavItemModel } from '../../models/NavItemModel'

describe('NavItemModel', () => {
  it('constructs a model with id, icon and to', () => {
    const model = new NavItemModel({ id: 'nav-person', icon: 'person', to: '/v1' })
    
    expect(model.id).toBe('nav-person')
    expect(model.icon).toBe('person')
    expect(model.to).toBe('/v1')
  })

  it('has readonly getters', () => {
    const model = new NavItemModel({ id: 'nav-person', icon: 'person', to: '/v1' })
    
    // @ts-expect-error — no setter
    expect(() => { model.id = 'other' }).toThrow()
    // @ts-expect-error — no setter
    expect(() => { model.icon = 'email' }).toThrow()
    // @ts-expect-error — no setter
    expect(() => { model.to = '/v2' }).toThrow()
  })

  it('validates that to is a registered route (type-safe)', () => {
    // TypeScript error at compile time if to is not a valid route
    const model = new NavItemModel({ id: 'nav-person', icon: 'person', to: '/v1' })
    expect(model.to).toBeDefined()
  })

  it('accepts different registered routes', () => {
    const model1 = new NavItemModel({ id: 'nav-v1', icon: 'person', to: '/v1' })
    const model2 = new NavItemModel({ id: 'nav-v2', icon: 'email', to: '/v2' })
    const model3 = new NavItemModel({ id: 'nav-root', icon: 'home', to: '/' })
    
    expect(model1.to).toBe('/v1')
    expect(model2.to).toBe('/v2')
    expect(model3.to).toBe('/')
  })
})
