import { useRouter, useRouterState } from '@tanstack/react-router'
import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useNavbarController } from '../../hooks/useNavbarController'
import type { NavItemAnchorAttrs, NavItemClickDeps } from '../../models/NavItemModel'
import { NavItemModel } from '../../models/NavItemModel'
import { RouteNavItemModel } from '../../models/RouteNavItemModel'
import type { NavbarMap } from '../../types'

vi.mock('@tanstack/react-router', () => ({
  useRouter: vi.fn(() => ({
    preloadRoute: vi.fn(),
  })),
  useRouterState: vi.fn(() => ({
    location: {
      pathname: '/v1',
    },
  })),
}))

describe('useNavbarController', () => {
  let mockNavigation: NavbarMap
  const preloadRoute = vi.fn()

  class ProgrammaticOnlyNavItemModel extends NavItemModel {
    constructor() {
      super({ id: 'programmatic', icon: 'share' })
    }

    override toAnchorAttrs(): NavItemAnchorAttrs {
      return {}
    }

    override onClick(_event: MouseEvent, _deps: NavItemClickDeps): void {
      // no-op
    }
  }

  beforeEach(() => {
    preloadRoute.mockReset()
    vi.mocked(useRouter).mockReturnValue({
      preloadRoute,
    } as ReturnType<typeof useRouter>)

    vi.mocked(useRouterState).mockReturnValue({
      location: { pathname: '/v1' },
    } as ReturnType<typeof useRouterState>)

    mockNavigation = new Map([
      ['spacer-top', null],
      [
        'main',
        new Set([
          new RouteNavItemModel({ id: 'nav-person', icon: 'person', to: '/v1' }),
          new RouteNavItemModel({ id: 'nav-v2', icon: 'email', to: '/v2' }),
          new ProgrammaticOnlyNavItemModel(),
        ]),
      ],
    ])
  })

  it('transforms Map into entries', () => {
    const { result } = renderHook(() => useNavbarController(mockNavigation))

    expect(result.current.navigationEntries).toBeInstanceOf(Array)
    expect(result.current.navigationEntries).toHaveLength(2)
    expect(result.current.navigationEntries[0][0]).toBe('spacer-top')
    expect(result.current.navigationEntries[1][0]).toBe('main')
  })

  it('calculates activeItem based on current route', () => {
    const { result } = renderHook(() => useNavbarController(mockNavigation))

    expect(result.current.activeItem).not.toBeNull()
    expect(result.current.activeItem).toBeInstanceOf(RouteNavItemModel)
    expect((result.current.activeItem as RouteNavItemModel).to).toBe('/v1')
    expect(result.current.activeItem?.id).toBe('nav-person')
  })

  it('returns null if there is no active route', () => {
    vi.mocked(useRouterState).mockReturnValue({
      location: { pathname: '/not-found' },
    } as ReturnType<typeof useRouterState>)

    const { result } = renderHook(() => useNavbarController(mockNavigation))
    expect(result.current.activeItem).toBeNull()
  })

  it('handles spacers correctly (null)', () => {
    const { result } = renderHook(() => useNavbarController(mockNavigation))

    const spacerEntry = result.current.navigationEntries.find(([id]) => id === 'spacer-top')
    expect(spacerEntry).toBeDefined()
    expect(spacerEntry?.[1]).toBeNull()
  })

  it('handles empty Sets', () => {
    const emptyNavigation: NavbarMap = new Map([['empty-group', new Set()]])

    const { result } = renderHook(() => useNavbarController(emptyNavigation))

    expect(result.current.navigationEntries).toHaveLength(1)
    expect(result.current.navigationEntries[0][1]?.size).toBe(0)
  })

  it('preloads only RouteNavItemModel instances', () => {
    renderHook(() => useNavbarController(mockNavigation))

    expect(preloadRoute).toHaveBeenCalledTimes(2)
    expect(preloadRoute).toHaveBeenCalledWith({ to: '/v1' })
    expect(preloadRoute).toHaveBeenCalledWith({ to: '/v2' })
  })
})
