import { describe, expect, it, vi } from 'vitest'
import { RouteNavItemModel } from '../../models/RouteNavItemModel'

describe('RouteNavItemModel', () => {
  it('exposes route as href attrs', () => {
    const model = new RouteNavItemModel({ id: 'nav-person', icon: 'person', to: '/v1' })

    expect(model.to).toBe('/v1')
    expect(model.toAnchorAttrs()).toEqual({ href: '/v1' })
  })

  it('prevents default and navigates with onActivate hook', () => {
    const model = new RouteNavItemModel({ id: 'nav-person', icon: 'person', to: '/v1' })
    const event = new MouseEvent('click')
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault')
    const navigate = vi.fn()
    const onActivate = vi.fn()

    model.onClick(event, { navigate, onActivate })

    expect(preventDefaultSpy).toHaveBeenCalledOnce()
    expect(onActivate).toHaveBeenCalledWith(model)
    expect(navigate).toHaveBeenCalledWith({ to: '/v1' })
  })
})
